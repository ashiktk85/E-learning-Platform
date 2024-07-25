
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()

let secret_key = process.env.SECRET_KEY as string;

console.log("seceeet",secret_key);

export default secret_key;
 