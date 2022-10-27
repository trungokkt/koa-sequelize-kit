import XlsxPopulate from "xlsx-populate";
import service from "./todoHistoryService"
const generateReport = async () => {
    // Load a new blank workbook
    const workbook = await XlsxPopulate.fromFileAsync("src/template.xlsx");
    // workbook.sheet("Sheet1").cell("A1").value("This is neat!");
    let options = {}
    const data = await service.getAll(options);
    //
    workbook.sheet("Sheet1").column(7).width(25).hidden(false).style("numberFormat", "dd/mm/yyyy");
    
    console.log(typeof data)
    for (let i = 0; i < data.length; i++) {
        workbook.sheet("Sheet1").cell(i+2,1).value(data[i].user.username);
        workbook.sheet("Sheet1").cell(i+2,2).value(data[i].user.name);
        workbook.sheet("Sheet1").cell(i+2,3).value(data[i].todo.name);
        workbook.sheet("Sheet1").cell(i+2,4).value(data[i].process);
        workbook.sheet("Sheet1").cell(i+2,5).value(data[i].status);
        workbook.sheet("Sheet1").cell(i+2,6).value(data[i].comment);
        workbook.sheet("Sheet1").cell(i+2,7).value(data[i].createdAt)
    }
    return workbook.outputAsync();
}
export default generateReport;
