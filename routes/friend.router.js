import { Router } from "express";
import {
    postFriend,
    deleteFriend,
    updateFriend,
} from "../controllers/friend.controller.js";
import { permission } from "../middleware/Permission.js";

const routerFriend = new Router();

routerFriend.route("/").post(postFriend);
routerFriend
    .route("/:id")
    .put(permission(), updateFriend)
    .delete(permission(), deleteFriend);
export default routerFriend;
