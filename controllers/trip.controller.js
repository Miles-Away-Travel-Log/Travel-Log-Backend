import Trip from "../models/trip.model.js";
import { validationResult } from "express-validator";

// get Trip
export async function getTrip(req, res) {
    const id = req.params.id;

    const trip = await Trip.findById(id)
        .populate("seedMoney")
        .populate("budget")
        .exec();

    if (trip === undefined || !trip) {
        res.status(400).send("Trip not found");
        return;
    }

    res.status(200).json({
        message: "Trip found",
        trip: {
            id: trip._id,
            tripName: trip.tripName,
            tripType: trip.tripType,
            description: trip.description,
            startDate: trip.startDate,
            endDate: trip.endDate,
            mapStyle: {
                name: trip.mapStyle.name,
                link: trip.mapStyle.link,
                iconColor: trip.mapStyle.iconColor,
            },
            startPoint: {
                longitude: trip.mapStyle.longitude,
                latitude: trip.mapStyle.latitude,
                city: trip.mapStyle.city,
                country: trip.mapStyle.country,
            },
            participants: trip.participants,
            seedMoney: trip.seedMoney,
            budget: trip.budget,
        },
    });
}

// post Trip
export async function postTrip(req, res) {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const {
            tripName,
            tripType,
            description,
            startDate,
            endDate,
            mapStyle,
            startPoint,
            participants,
        } = req.body;

        const trip = new Trip({
            tripName,
            tripType,
            description,
            startDate,
            endDate,
            mapStyle,
            startPoint,
            participants,
        });
        await trip.save();
        res.status(200).json({
            message: "Trip added",
            trip: {
                id: trip._id,
                tripName: trip.tripName,
                tripType: trip.tripType,
                description: trip.description,
                startDate: trip.startDate,
                endDate: trip.endDate,
                mapStyle: {
                    name: trip.mapStyle.name,
                    link: trip.mapStyle.link,
                    iconColor: trip.mapStyle.iconColor,
                },
                startPoint: {
                    longitude: trip.mapStyle.longitude,
                    latitude: trip.mapStyle.latitude,
                    city: trip.mapStyle.city,
                    country: trip.mapStyle.country,
                },
                participants: trip.participants,
                seedMoney: trip.seedMoney,
                budget: trip.budget,
            },
        });
    } else {
        res.status(400).json({
            message: "Validation failed",
            errors: errors.array(),
        });
    }
}

// put Trip
export async function putTrip(req, res) {
    const id = req.params.id;
    const updatedTrip = req.body;

    if (!updatedTrip) {
        res.status(400).send("Trip not found");
        return;
    }

    try {
        await Trip.findByIdAndUpdate({ _id: id }, updatedTrip);
        res.status(200).send("Trip updated");
    } catch (error) {
        res.status(400).send(error);
    }
}

// delete Trip
export async function deleteTrip(req, res) {
    const id = req.params.id;
    const trip = await Trip.findById({ _id: id });

    if (!trip) {
        res.status(400).send("Trip not found");
        return;
    }

    try {
        await Trip.findByIdAndDelete({ _id: id });
        res.status(200).send("Trip deleted");
    } catch (error) {
        res.status(400).send(error);
    }
}
