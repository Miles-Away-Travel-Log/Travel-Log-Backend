import mongoose from "mongoose";
const { model, Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
    },
    visible: {
        type: Boolean,
    },
    avatar: {
        type: String,
    },
    mapStyle: {
        name: {
            type: String,
        },
        link: {
            type: String,
        },
        iconColor: {
            type: String,
        },
    },
    home: {
        longitude: {
            type: Number,
        },
        latitude: {
            type: Number,
        },
        city: {
            type: String,
        },
        country: {
            type: String,
        },
    },
});

const User = model("User", userSchema, "users");

export default User;
