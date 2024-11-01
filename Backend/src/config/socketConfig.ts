import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import mongoose from "mongoose";
import Group from '../models/groupSchema';
import { CommunityRepository } from "../repository/communityRepository";
import Rating from "../models/ratingModel";
import { Course } from "../models/courseModel";
import dotenv from 'dotenv';
import userModel from "../models/userModel";

dotenv.config();

let io: SocketServer;

const configSocketIO = (server: HttpServer) => {
    io = new SocketServer(server, {
        cors: {
            origin: process.env.BASE_URL,
            methods: ["GET", "POST"],
        },
    });

    io.on('connection', (socket) => {
        console.log("Socket connected:", socket.id);

        socket.on('joinRoom', (courseId) => {
            socket.join(courseId);
            console.log(`Client ${socket.id} joined room: ${courseId}`);
        });

        socket.on('sendMessage', async (payload) => {
            try {
                const { userId, courseId, message } = payload;
                const saveData = await CommunityRepository.saveMessages(courseId, userId, message);
                const latestMessage = saveData.messages[saveData.messages.length - 1];
                const user = await CommunityRepository.fetchUserDetails(userId);

                io.to(courseId).emit('receiveMessage', {
                    userId,
                    userDetails: user,
                    message: latestMessage.message,
                    timestamp: latestMessage.timestamp,
                    messageId: latestMessage._id,
                });

            } catch (error) {
                console.error('Error saving message:', error);
            }
        });

        socket.on('typing', async(payload) => {
            const user = await userModel.findOne({userId : payload.userId})
            console.log("user ", user);
            console.log("pay ", payload);
            
            io.to(payload.courseId).emit('userTyping', payload.userId , user?.firstName);
        });

        socket.on('stopTyping', (payload) => {
            io.to(payload.courseId).emit('userStoppedTyping', payload.userId);
        });

        socket.on('deleteMessage', async (payload) => {
            try {
                console.log(payload, "payload");
                
                const { messageId, courseId } = payload;
                await CommunityRepository.deleteMessage(messageId , courseId);
                io.to(courseId).emit('messageDeleted', messageId);
            } catch (error) {
                console.error('Error deleting message:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });

        socket.on('submitRating', async (payload) => {
            const { courseId, userId, ratingValue, review } = payload;

            try { 
                const existingRating = await Rating.findOne({ courseId, userId });
                if (existingRating) {
                    socket.emit('ratingError', 'You have already rated this course.');
                    return;
                } 
                const newRating = new Rating({
                    courseId,
                    userId,
                    ratingValue,
                    review,
                });

                await newRating.save();
                await Course.findByIdAndUpdate(courseId, {
                    $push: { ratings: newRating._id }
                });

                io.to(courseId.toString()).emit('receiveRating', {
                    userId,
                    ratingValue,
                    review,
                    createdAt: newRating.createdAt,
                });
            } catch (error) {
                console.error('Error submitting rating:', error);
            }
        });
    });
};

export { configSocketIO, io };
