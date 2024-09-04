const Razorpay = require('razorpay');
import dotenv from 'dotenv'
dotenv.config()

const razorpay = new Razorpay({
    key_id: process.env.RAZOR_KEY,
    key_secret: process.env.RAZOR_SECRET,
  });

  export default razorpay;