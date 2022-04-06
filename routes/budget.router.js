import { Router } from "express";
import {
    postBudget,
    updateBudget,
    deleteBudget,
} from "../controllers/budget.controller.js";
import { body } from "express-validator";

const routerBudget = new Router();

routerBudget
    .route("/")
    .post(
        body("value").isFloat().withMessage("Value must be a number"),
        postBudget
    );

routerBudget.route("/:id").put(updateBudget).delete(deleteBudget);

export default routerBudget;
