import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import routerUsers from "./routes/users.router.js";
import routerBudget from "./routes/budget.router.js";
import routerSeedMoney from "./routes/seedMoney.router.js";
import routerPDF from "./routes/pdf.router.js";

const corsOption = {
    origin: process.env.ORIGIN_URL,
    Credentials: true,
    optionsSuccessStatus: 200,
};

const PORT = process.env.PORT || 4000;
const uri = process.env.URI_DB;

mongoose.connect(uri, (err) => {
    if (err) console.log(err);
    console.log("Connected to DB");
});

const app = express();

app.use(express.json());

app.use(cors(corsOption));

app.get("/", (req, res) => {
    res.send("Welcome to Miles Away");
});

app.use("/users", routerUsers);
app.use("/budget", routerBudget);
app.use("/seed-money", routerSeedMoney);
app.use("/pdf", routerPDF);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
