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

routerTrip.route("/").post(
    body("tripName")
        .isAlpha()
        .withMessage("Trip name must be alphabetic")
        .isLength({ min: 3, max: 30 })
        .withMessage("Trip name must be between 3 and 30 characters"),
    body("description")
        .isLength({ min: 3, max: 100 })
        .withMessage("Description must be between 3 and 100 characters"),
    body("startDate").isDate().withMessage("Start date must be a date"),
    body("endDate").isDate().withMessage("End date must be a date"),
    check("endDate")
        .custom((value, { req }) => {
            if (
                value &&
                req.body.startDate &&
                (validator.isAfter(value, req.body.startDate) ||
                    value === req.body.startDate)
            ) {
                return true;
            }
        })
        .withMessage("End date must be after start date"),
    permission(),
    postTrip
);

routerTrip
    .route("/:id")
    .get(permission(), getTrip)
    .put(permission(), putTrip)
    .delete(permission(), deleteTrip);

export default routerTrip;
