import mongoose from "mongoose";

export async function Connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection=mongoose.connection;
        connection.on("connected",()=>{
            console.log("Connected to MongoDB");
        });
        connection.on("error",(err)=>{
            console.log("Mongodb connection error",err);
            process.exit()
        });
    } catch (error) {
        console.log("Something went wrong while connecting to db");
        console.log(error)
    }
}