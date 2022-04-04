import { Router } from "express";
import { getUser, login, register } from "../controllers/users.controller.js";

const routerUsers = new Router();

routerUsers.route("/login").post(login);
routerUsers.route("/register").post(register);
routerUsers.route("/:id").get(getUser);

export default routerUsers;
