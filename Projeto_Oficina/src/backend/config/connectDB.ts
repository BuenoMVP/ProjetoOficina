import mongoose from "mongoose"

import dotenv from "dotenv"
dotenv.config()

const db_password = process.env.PASSWORD_DB

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(`mongodb+srv://marcosvbp:${db_password}@cluster0.6bpqg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        console.log('MongoDB Connected')
    } catch (err) {
        console.error('Error connect DB: '+err)
        process.exit(1)
    }
}

export { connectDB }
