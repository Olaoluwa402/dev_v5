import mongoose from 'mongoose'

export const dbConnect = () => {
    const conn = mongoose.connect("mongodb+srv://rachealonimisi:ohunene123@racheals-cluster.c4ckoip.mongodb.net/Library-Management-System")
    return conn
}