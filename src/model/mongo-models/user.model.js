import mongoose from 'mongoose';

const collection = 'users';

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    },
    carts: {
        type: [
            {
                carts: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "carts"
                }
            }
        ],
        default: []
    },
    age: Number,
    password: String,
    loggedBy: String
})

const userModel = mongoose.model(collection, schema);

export default userModel;