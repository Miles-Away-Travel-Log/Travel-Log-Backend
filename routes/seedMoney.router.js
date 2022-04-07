import { Router } from "express";
import {
    postSeedMoney,
    updateSeedMoney,
    deleteSeedMoney,
} from "../controllers/seedMoney.controller.js";

import { body } from "express-validator";

const routerSeedMoney = new Router();

routerSeedMoney
    .route("/")
    .post(
        body("total").isFloat().withMessage("Value must be a number"),
        postSeedMoney
    );

routerSeedMoney.route("/:id").put(updateSeedMoney).delete(deleteSeedMoney);

export default routerSeedMoney;
