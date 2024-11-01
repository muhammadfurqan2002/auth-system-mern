import mongoose from "mongoose"

export const connectDB=()=>{
    mongoose.connect(process.env.MONGO_DB_CONNECTION).then(()=>{
        console.log("db connected")
    }).catch((error)=>{
        console.log("Error connecting db :",error)
    })
}