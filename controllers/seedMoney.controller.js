import SeedMoney from "../models/seedMoney.model.js";
import { validationResult } from "express-validator";

// Post
export async function postSeedMoney(req, res) {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const { total, currency, user } = req.body;
        try {
            const seedMoney = new SeedMoney({
                total,
                currency,
                user,
            });
            await seedMoney.save();
            res.status(200).json({
                message: "Seed money added",
                "Seed Money": {
                    id: seedMoney._id,
                    total: seedMoney.total,
                    currency: seedMoney.currency,
                },
            });
        } catch (error) {
            res.status(400).json(error);
            return;
        }
    } else {
        res.status(400).json({
            message: "Validation failed",
            errors: errors.array(),
        });
    }
}

// Update
export async function updateSeedMoney(req, res) {
    const updatedSeedMoney = req.body;
    const id = req.params.id;

    if (!updatedSeedMoney || !id) {
        res.status(400).json({
            message: "Seed money not found",
        });
        return;
    }

    try {
        await SeedMoney.findOneAndUpdate({ _id: id }, updatedSeedMoney);
        res.status(200).send("Seed money updated");
    } catch (error) {
        res.status(400).send(error);
    }
}

// Delete
export async function deleteSeedMoney(req, res) {
    const id = req.params.id;
    const exist = await SeedMoney.findOne({ _id: id });

    if (!exist) {
        res.status(400).json({
            message: "Seed money not found",
        });
        return;
    }

    try {
        await SeedMoney.findOneAndDelete({ _id: id });
        res.status(200).send("Seed money deleted");
    } catch (error) {
        res.status(400).send(error);
    }
}
