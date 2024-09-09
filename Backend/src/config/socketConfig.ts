import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import mongoose from "mongoose";
import Group from '../models/groupSchema';
import { CommunityRepository } from "../repository/communityRepository";

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

                // Save the message in the repository
                const saveData = await CommunityRepository.saveMessages(courseId, userId, message);

                // Extract the latest message (last one in the array)
                const latestMessage = saveData.messages[saveData.messages.length - 1];

                // Fetch user details
                const user = await CommunityRepository.fetchUserDetails(userId);

                // Emit the message with user details to the room
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
    });
};

export { configSocketIO, io };
