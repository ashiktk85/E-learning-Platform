import { AwsConfig } from "../config/awsFileConfigs";
import Group from "../models/groupSchema";
import userModel from "../models/userModel";

export class CommunityRepository {

  static async getMessages(courseId: string) {
    try {
      const group = await Group.findOne({ courseId }).select("messages").exec();

      if (!group) {
        throw new Error("No group found");
      }

      const userMessages = group.messages;

      const userIds = Array.from(new Set(userMessages.map(um => um.userId)));

      const users = await userModel.find({ userId: { $in: userIds } }).exec();

      const userMap = users.reduce((map, user) => {
        map[user.userId] = user;
        return map;
      }, {} as { [key: string]: any });

      const messagesWithUserDetails = userMessages.map(userMsg => ({
        userId: userMsg.userId,
        userDetails: userMap[userMsg.userId] || null,
        message: userMsg.message,
        timestamp: userMsg.timestamp
      }));

      console.log(messagesWithUserDetails, "Fetched messages with user details");
      return messagesWithUserDetails;
    } catch (error: any) {
      console.log("Error in getting messages from community repository:", error.message);
      throw new Error(error.message);
    }
  }

  static async saveMessages(courseId: string, userId: string, message: string) {
    try {
      let group = await Group.findOne({ courseId });

      if (!group) {
        group = new Group({
          courseId,
          messages: [
            {
              userId,
              message,
              timestamp: new Date(),
              courseId,
            },
          ],
        });
        await group.save();
        return group;
      }

      group.messages.push({
        userId,
        message,
        timestamp: new Date(),
        courseId,
      });

      await group.save();
      return group;
    } catch (error: any) {
      console.log("Error in saving messages to community repository:", error.message);
      throw new Error(error.message);
    }
  }

  
  static async fetchUserDetails(userId: string) {
    try {
      const awsConfig = new AwsConfig()
      const user = await userModel.findOne({ userId }).exec();
      if (!user) throw new Error('User not found');

      let profileUrl = "";
      if (user?.profile) {
        profileUrl = await awsConfig.getfile(
          user?.profile as string,
          `users/profile/${user?.userId}`
        );
      }

      return { 
        firstName: user.firstName, 
        lastName: user.lastName, 
        email: user.email,
        profileUrl 
      };
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null; 
    }
  }
}
