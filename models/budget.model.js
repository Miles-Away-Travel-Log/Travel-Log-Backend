import mongoose from "mongoose";
const { model, Schema } = mongoose;

const budgetSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Budget = model("Budget", budgetSchema, "budget");

export default Budget;
