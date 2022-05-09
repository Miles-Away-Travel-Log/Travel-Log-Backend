import { Router } from "express";
import {
    getUser,
    login,
    register,
    deleteUser,
    updateUser,
    getAllUser,
} from "../controllers/users.controller.js";
import { body } from "express-validator";
import { permission } from "../middleware/Permission.js";

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

    register
);
routerUsers
    .route("/:id")
    .get(permission(), getUser)
    /* .get(getUserTest) */
    .put(
        body("firstName")
            .optional()
            .isAlpha()
            .withMessage("First name must be alphabetic")
            .isLength({ min: 3, max: 20 })
            .withMessage("First name must be between 3 and 20 characters"),
        body("lastName")
            .optional()
            .isAlpha()
            .withMessage("Last name must be alphabetic")
            .isLength({ min: 3, max: 20 })
            .withMessage("Last name must be between 3 and 20 characters"),
        body("userName")
            .optional()
            .isLength({ min: 3, max: 10 })
            .withMessage("User name must be between 3 and 10 characters"),
        body("email")
            .optional()
            .isEmail()
            .withMessage("Email must be a valid email address"),
        permission(),
        updateUser
    )
    .delete(permission(), deleteUser);

routerUsers.route("/").get(getAllUser);
export default routerUsers;
