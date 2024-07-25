import UserModel , {IUser} from '../models/userModel'

export class UserRepositary {

    static async createUser(userData : any) : Promise<IUser> {
        try {
            console.log("Creating new user with :", userData);
            const newUser = new UserModel(userData)
            console.log("New user created:", newUser);
            return await newUser.save();   
        } catch (error : any) {
            console.log("Error in creating new User" , error);
            throw new Error(`Error creating user : ${error.message}`)
            
        }
    }
}