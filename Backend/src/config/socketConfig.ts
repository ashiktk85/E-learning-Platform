import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import mongoose from "mongoose";
import Group from '../models/groupSchema';
import { CommunityRepository } from "../repository/communityRepository";
import Rating from "../models/ratingModel";
import { Course } from "../models/courseModel";

let io: SocketServer;

const configSocketIO = (server: HttpServer) => {
    io = new SocketServer(server, {
        cors: {
            origin: "http://localhost:5173",
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
                });

            } catch (error) {
                console.error('Error saving message:', error);
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
        
                
                await Course.findOneAndUpdate(courseId, {
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
