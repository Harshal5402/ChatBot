import mongoose from "mongoose";
import 'dotenv/config'

const DB = process.env.DATABASE;

export const connectDB = async () => {
    await mongoose.connect(DB)
    .then(() => console.log('Connecting to the DataBase'))
    .catch(err => console.error('Error Connecting to the DataBase', err))
}
