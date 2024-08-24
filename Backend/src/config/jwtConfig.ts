import { Request, Response , NextFunction } from "express";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'


dotenv.config()

const createToken = (user_id: string): string => {
    const newToken = jwt.sign({ user_id }, process.env.SECRET_KEY as string, { expiresIn: '10s' });
    return newToken;
 };

let secret_key = process.env.SECRET_KEY as string;

console.log("seceeet",secret_key);

const verifyToken  = (req : Request , res : Response, next : NextFunction) => {
        const authHeader = req.headers['authorization']
        console.log("!authheader");
        
        if(!authHeader) {
            return res.status(401).send("Authorization failed.")
        }

        const token = authHeader.split(" ")[1]
        console.log(token);

        console.log("!token");
        

        if(!token) {
            return res.status(401).send("Authorization failed.")
        }

        jwt.verify(token , secret_key ,(err : any) => {
            console.log("error in verifying  jtoken");
            return res.status(401).send("Authorization failed.")
        })

        
        
}



export  {secret_key ,createToken , verifyToken};
 