import mongoose from "mongoose";

const messageCollection = 'message';

const messageSchema = new mongoose.Schema ({
    user: { type: String, required: true },
    message: { type: String, required: true } 
})
export const messageModels = mongoose.model(messageCollection, messageSchema)