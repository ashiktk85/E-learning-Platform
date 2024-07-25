import bcrypt from 'bcrypt'
import {v4 as uuidv4 } from 'uuid'
import { UserRepositary } from '../repository/userRepository';
import sendEmailOtp from '../helper/mailService';

export class UserService {
    private otp : any;
    
    async signUp(userData : any) {

        const saltRounds : number = 10;
        const hashedPassword = await bcrypt.hash(userData.password ,saltRounds)

        const userId = uuidv4();
        const data = {
            userId : userId,
            firstName : userData.firstName,
            lastName : userData.lastName,
            email : userData.email,
            phone : userData.phone,
            passwordHash : hashedPassword,
            createdAt : new Date()
        }

        const user = await UserRepositary.createUser(data);

        this.otp = Math.floor(10000 + Math.random() * 90000)
        console.log(this.otp);

        sendEmailOtp(userData.email , this.otp )
        
    }
}

