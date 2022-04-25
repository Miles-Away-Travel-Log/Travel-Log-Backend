import { Router } from "express";
import {
    postBudget,
    updateBudget,
    deleteBudget,
} from "../controllers/budget.controller.js";
import { body } from "express-validator";
import { permission } from "../middleware/Permission.js";

const routerBudget = new Router();

routerBudget
    .route("/")
    .post(
        body("value").isFloat().withMessage("Value must be a number"),
        permission(),
        postBudget
    );

routerBudget
    .route("/:id")
    .put(permission(), updateBudget)
    .delete(permission(), deleteBudget);

export default routerBudget;
