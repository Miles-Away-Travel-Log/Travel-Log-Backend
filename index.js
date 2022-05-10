import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import routerUsers from "./routes/users.router.js";
import routerBudget from "./routes/budget.router.js";
import routerSeedMoney from "./routes/seedMoney.router.js";
import routerPDF from "./routes/pdf.router.js";
import routerFriend from "./routes/friend.router.js";
import routerTrip from "./routes/trip.router.js";
import routerDiary from "./routes/diary.router.js";
import { auth } from "./middleware/AuthMiddleWare.js";

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

app.use(auth());

app.get("/", (req, res) => {
    res.send("Welcome to Miles Away");
});

app.use("/users", routerUsers);
app.use("/budget", routerBudget);
app.use("/seed-money", routerSeedMoney);
app.use("/pdf", routerPDF);
app.use("/friend", routerFriend);
app.use("/trip", routerTrip);
app.use("/diary", routerDiary);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
