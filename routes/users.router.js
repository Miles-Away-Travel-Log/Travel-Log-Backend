import { Router } from "express";
import {
    getUser,
    login,
    register,
    deleteUser,
    updateUser,
} from "../controllers/users.controller.js";
import { body } from "express-validator";

const routerUsers = new Router();

routerUsers.route("/login").post(login);
routerUsers.route("/register").post(
    body("firstName")
        .isAlpha()
        .withMessage("First name must be alphabetic")
        .isLength({ min: 3, max: 20 })
        .withMessage("First name must be between 3 and 20 characters"),
    body("lastName")
        .isAlpha()
        .withMessage("Last name must be alphabetic")
        .isLength({ min: 3, max: 20 })
        .withMessage("Last name must be between 3 and 20 characters"),
    body("userName")
        .isLength({ min: 3, max: 10 })
        .withMessage("User name must be between 3 and 10 characters"),
    body("email").isEmail().withMessage("Email must be a valid email address"),
    body("city")
        .isAlpha()
        .withMessage("City must be alphabetic")
        .isLength({ min: 3, max: 30 })
        .withMessage("City must be between 3 and 30 characters"),
    body("country")
        .isAlpha()
        .withMessage("Country must be alphabetic")
        .isLength({ min: 3, max: 30 })
        .withMessage("Country must be between 3 and 30 characters"),

    register
);
routerUsers.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default routerUsers;
