import mongoose  from "mongoose";
import dotenv  from "dotenv";

dotenv.config()

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string );
        console.log("Database connected....");

        await mongoose.connection.db.collection('users').dropIndex('tutorCredentials.tutorId_1');
    console.log('Index dropped successfully');
        
    } catch (error) {
        console.log("Database  betrayed broo");
        
    }
}


export default ConnectDB;
