import { Router } from "express";
import {
    postSeedMoney,
    updateSeedMoney,
    deleteSeedMoney,
} from "../controllers/seedMoney.controller.js";

import { body } from "express-validator";
import { permission } from "../middleware/Permission.js";

const routerSeedMoney = new Router();

routerSeedMoney
    .route("/")
    .post(
        body("total").isFloat().withMessage("Value must be a number"),
        permission(),
        postSeedMoney
    );

routerSeedMoney
    .route("/:id")
    .put(permission(), updateSeedMoney)
    .delete(permission(), deleteSeedMoney);

export default routerSeedMoney;
