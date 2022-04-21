import PDFDocument from "pdfkit";

function buildPDF(dataCallback, endCallback, userBudget) {
    const doc = new PDFDocument();
    doc.on("data", dataCallback);
    doc.on("end", endCallback);

    function sortByDate(x, y) {
        if (x.date < y.date) {
            return -1;
        }
        if (x.date > y.date) {
            return 1;
        }
        return 0;
    }

    const sortedUserBudget = userBudget.sort(sortByDate);

    for (let i = 0; i < sortedUserBudget.length; i++) {
        doc.fontSize(20)
            .fillColor("blue")
            .text(sortedUserBudget[i].date, { underline: true });
        doc.fontSize(16)
            .fillColor("black")
            .list([
                sortedUserBudget[i].type,
                sortedUserBudget[i].category,
                sortedUserBudget[i].value,
                sortedUserBudget[i].description,
            ]);
        doc.text("\n");
    }
    doc.end();
}

export default buildPDF;
