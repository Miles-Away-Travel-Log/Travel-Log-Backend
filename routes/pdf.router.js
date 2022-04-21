import { Router } from "express";
import { getPDF } from "../controllers/pdf.controller.js";

const routerPDF = new Router();

routerPDF.route("/:id").get(getPDF);

export default routerPDF;
