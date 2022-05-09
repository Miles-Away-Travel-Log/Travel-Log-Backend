import { Router } from "express";
import {
    getTrip,
    postTrip,
    putTrip,
    deleteTrip,
} from "../controllers/trip.controller.js";

import { permission } from "../middleware/Permission.js";
import { body, check } from "express-validator";
import validator from "validator";

const routerTrip = new Router();

routerTrip
    .route("/")
    .post(
        body("tripName")
            .isLength({ min: 3, max: 30 })
            .withMessage("Trip name must be between 3 and 30 characters"),
        body("description")
            .isLength({ min: 3, max: 100 })
            .withMessage("Description must be between 3 and 100 characters"),
        permission(),
        postTrip
    );

routerTrip
    .route("/:id")
    .get(permission(), getTrip)
    .put(permission(), putTrip)
    .delete(permission(), deleteTrip);

export default routerTrip;
