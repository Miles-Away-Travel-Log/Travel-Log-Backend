import mongoose from "mongoose";
const { model, Schema } = mongoose;

const tripSchema = new Schema(
    {
        tripName: {
            type: String,
            required: true,
        },
        tripType: {
            type: String,
        },
        description: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        participants: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
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
        startPoint: {
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
        visible: {
            type: Boolean,
            default: false,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

tripSchema.virtual("seedMoney", {
    ref: "SeedMoney",
    localField: "_id",
    foreignField: "trip",
});

tripSchema.virtual("budget", {
    ref: "Budget",
    localField: "_id",
    foreignField: "trip",
});

const Trip = model("Trips", tripSchema, "trips");

export default Trip;
