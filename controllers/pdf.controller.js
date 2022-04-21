import buildPDF from "../service/pdf-service.js";
import User from "../models/users.model.js";

export async function getPDF(req, res) {
    const id = req.params.id;

    const user = await User.findById(id).populate("budget").exec();

    if (user === undefined) {
        res.status(400).send("User not found");
        return;
    }

    const userBudget = user.budget;

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
        userBudget
    );
}
