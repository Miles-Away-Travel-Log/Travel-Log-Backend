import { Router } from "express";
import { getPDF } from "../controllers/pdf.controller.js";
import { permission } from "../middleware/Permission.js";
const routerPDF = new Router();

routerPDF.route("/:id").get(getPDF);

export default routerPDF;
