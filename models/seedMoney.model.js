import mongoose from "mongoose";
const { model, Schema } = mongoose;

const seedMoneySchema = new Schema({
    total: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const seedMoney = model("SeedMoney", seedMoneySchema, "seedMoney");

export default seedMoney;
