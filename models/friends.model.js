import mongoose from "mongoose";
const { model, Schema } = mongoose;

const friendSchema = new Schema({
    sentRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receivedRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: Boolean,
    },
});

const friend = model("Friend", friendSchema, "friend");

export default friend;
