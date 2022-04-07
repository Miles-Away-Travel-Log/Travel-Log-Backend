import mongoose from "mongoose";
const { model, Schema } = mongoose;

const userSchema = new Schema(
    {
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
        city: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);
userSchema.virtual("seedMoney", {
    ref: "SeedMoney",
    localField: "user",
    foreignField: "_id",
});

userSchema.virtual("budget", {
    ref: "Budget",
    localField: "_id",
    foreignField: "user",
});

const User = model("User", userSchema, "users");

export default User;
