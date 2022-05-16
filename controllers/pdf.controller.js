import buildPDF from "../service/pdf-service.js";
import Trip from "../models/trip.model.js";

export async function getPDF(req, res) {
    const id = req.params.id;

    const trip = await Trip.findById(id).populate("budget").exec();

    if (trip === undefined) {
        res.status(400).send("Trip not found");
        return;
    }

    const tripBudget = trip.budget;

    const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=Transactions.pdf",
    });

    buildPDF(
        (chunk) => {
            stream.write(chunk);
        },
        () => {
            stream.end();
        },
        tripBudget
    );
}
