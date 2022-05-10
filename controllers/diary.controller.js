import Diary from "../models/diary.model.js";
import { validationResult } from "express-validator";

// get Diary

export async function getDiary(req, res) {
    const id = req.params.id;

    const diary = await Diary.findById(id);

    if (diary === undefined || !diary) {
        res.status(400).send("Diary not found");
        return;
    }

    res.status(200).json({
        message: "Diary found",
        diary: diary,
    });
}

// post Diary

export async function postDiary(req, res) {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const reqBody = req.body;

        if (!reqBody) {
            res.status(400).send("No diary submitted");
            return;
        }

        const diary = new Diary(reqBody);

        await diary.save();

        res.status(200).json({
            message: "diary added",
            diary: diary,
        });
    } else {
        res.status(400).json({
            message: "Validation failed",
            errors: errors.array(),
        });
    }
}

// update Diary

export async function putDiary(req, res) {
    const id = req.params.id;

    const updatedDiary = req.body;

    if (!updatedDiary) {
        res.status(400).send("Diary not found");
        return;
    }

    try {
        await Diary.findByIdAndUpdate({ _id: id }, updatedDiary);
        res.status(200).send("Diary updated");
    } catch (error) {
        res.status(400).send(error);
    }
}

// delete

export async function deleteDiary(req, res) {
    const id = req.params.id;

    const diary = await Diary.findById({ _id: id });

    if (!diary) {
        res.status(400).send("diary not found");
        return;
    }

    try {
        await Diary.findByIdAndDelete({ _id: id });
        res.status(200).send("Diary deleted");
    } catch (error) {
        res.status(400).send(error);
    }
}
