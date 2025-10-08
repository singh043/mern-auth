import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB CONNECTED SUCCESSFULLY!")
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
        process.exit(1);
    }
}