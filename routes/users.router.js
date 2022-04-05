import { Router } from "express";
import { getUser, login, register } from "../controllers/users.controller.js";
import { body } from "express-validator";

const routerUsers = new Router();

routerUsers.route("/login").post(login);
routerUsers.route("/register").post(
    body("firstName")
        .isString()
        .isLength({ min: 3, max: 20 })
        .withMessage(
            "First name must be between 3 and 20 characters and contains only letters"
        ),
    body("lastName")
        .isString()
        .isLength({ min: 3, max: 20 })
        .withMessage(
            "Last name must be between 3 and 20 characters and contains only letters"
        ),
    body("userName")
        .isAlphanumeric()
        .isLength({ min: 3, max: 10 })
        .withMessage(
            "User name must be between 3 and 10 characters and contains only letters and numbers"
        ),
    body("email").isEmail().withMessage("Email must be a valid email address"),
    body("city")
        .isString()
        .isLength({ min: 3, max: 30 })
        .withMessage(
            "City must be between 3 and 30 characters and contains only letters"
        ),
    body("country")
        .isString()
        .isLength({ min: 3, max: 30 })
        .withMessage(
            "Country must be between 3 and 30 characters and contains only letters"
        ),

    register
);
routerUsers.route("/:id").get(getUser);

export default routerUsers;
