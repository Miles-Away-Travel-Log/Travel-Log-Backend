import mongoose from "mongoose";
const { model, Schema } = mongoose;

const seedMoneySchema = new Schema({
    total: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trips",
        required: true,
    },
});

const seedMoney = model("SeedMoney", seedMoneySchema, "seedMoney");

export default seedMoney;
