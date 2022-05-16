import Budget from "../models/budget.model.js";
import { validationResult } from "express-validator";

// Post
export async function postBudget(req, res) {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const { type, value, date, category, description, trip } = req.body;
        try {
            const budget = new Budget({
                type,
                value,
                date,
                category,
                description,
                trip,
            });
            await budget.save();
            res.status(200).json({
                message: "Budget added",
                budget: {
                    id: budget._id,
                    type: budget.type,
                    value: budget.value,
                    date: budget.date,
                    category: budget.category,
                    description: budget.description,
                    trip: budget.trip,
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
export async function updateBudget(req, res) {
    const updatedBudget = req.body;
    const id = req.params.id;

    if (!updatedBudget || !id) {
        res.status(400).json({
            message: "Budget not found",
        });
        return;
    }

    try {
        await Budget.findOneAndUpdate({ _id: id }, updatedBudget);
        res.status(200).send("Budget updated");
    } catch (error) {
        res.status(400).send(error);
    }
}

// Delete
export async function deleteBudget(req, res) {
    const id = req.params.id;
    const exist = await Budget.findOne({ _id: id });

    if (!exist) {
        res.status(400).json({
            message: "Budget not found",
        });
        return;
    }

    try {
        await Budget.findOneAndDelete({ _id: id });
        res.status(200).send("Budget deleted");
    } catch (error) {
        res.status(400).send(error);
    }
}
