import mongoose from "mongoose";
const { model, Schema } = mongoose;

const diarySchema = new Schema({
    diaryName: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    visible: {
        type: Boolean,
        default: false,
    },
    location: {
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
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trips",
        //required: true,
    },
    pointId: {
        type: Number,
    },
    images: {
        type: [String],
    },
    titleImage: {
        type: String,
    },
});

const Diary = model("Diary", diarySchema, "diary");

export default Diary;
