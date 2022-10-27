import XlsxPopulate from "xlsx-populate";
import service from "./todoHistoryService"
const generateReport = async (user_id) => {
    // Load a new blank workbook
    const workbook = await XlsxPopulate.fromBlankAsync();
    // workbook.sheet("Sheet1").cell("A1").value("This is neat!");
    const data = await service.getAllByUser(user_id);
    console.log(data)
    //header
    const header = ["Tên công việc", "Người thực hiện", "Tên", "Tiến trình", "Tình trạng", "Comment", "CreateAt"]
    workbook.sheet("Sheet1").cell("A1").value([
        header
    ]);
    //style- format date dd-mm-yyyy
    workbook.sheet("Sheet1").column(7).width(15).hidden(false).style("numberFormat", "dd-mm-yyyy");

    for (let i = 0; i < data.length; i++) {
        workbook.sheet("Sheet1").cell(i + 2, 1).value(data[i].todo.name);
        workbook.sheet("Sheet1").cell(i + 2, 2).value(data[i].user.username);
        workbook.sheet("Sheet1").cell(i + 2, 3).value(data[i].user.name);
        workbook.sheet("Sheet1").cell(i + 2, 4).value(data[i].process);
        workbook.sheet("Sheet1").cell(i + 2, 5).value(data[i].status);
        workbook.sheet("Sheet1").cell(i + 2, 6).value(data[i].comment);
        workbook.sheet("Sheet1").cell(i + 2, 7).value(data[i].createdAt)
    }
    return workbook.outputAsync();
}
export default generateReport;
