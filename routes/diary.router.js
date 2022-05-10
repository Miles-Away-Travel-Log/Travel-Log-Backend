import { Router } from "express";
import {
    getDiary,
    postDiary,
    putDiary,
    deleteDiary,
} from "../controllers/diary.controller.js";

import { permission } from "../middleware/Permission.js";
import { body } from "express-validator";

const routerDiary = new Router();

routerDiary
    .route("/")
    .post(
        body("diaryName")
            .isLength({ min: 3, max: 30 })
            .withMessage("Diary name must be between 3 and 30 characters"),
        body("date").isDate().withMessage("Date must be a date"),
        body("description")
            .isLength({ min: 3, max: 5000 })
            .withMessage("Description must be between 3 and 500 characters"),
        permission(),
        postDiary
    );

routerDiary
    .route("/:id")
    .get(permission(), getDiary)
    .put(permission(), putDiary)
    .delete(permission(), deleteDiary);

export default routerDiary;
