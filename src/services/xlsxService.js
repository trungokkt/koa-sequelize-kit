import XlsxPopulate from "xlsx-populate";

import taskService from "./taskService"
import todosService from "./todosService"
import userService from "./userServices"
import joinTaskService from "./JoinService"

const generateTask = async () => {
    // Load a new blank workbook
    const workbook = await XlsxPopulate.fromBlankAsync();
    // workbook.sheet("Sheet1").cell("A1").value("This is neat!");
    const options = {}
    const data = await taskService.getAll(options);
    console.log(data)
    //header
    const header = ["Tên task", "Mô tả", "số lượng công việc", "Hoàn thành", "Ngày tạo", "Ngày hoàn thành", "Status"]
    workbook.sheet("Sheet1").cell("A1").value([
        header
    ]);
    //style- format date dd-mm-yyyy
    workbook.sheet("Sheet1").column(5).width(15).hidden(false).style("numberFormat", "dd-mm-yyyy");
    workbook.sheet("Sheet1").column(6).width(15).hidden(false).style("numberFormat", "dd-mm-yyyy");

    for (let i = 0; i < data.length; i++) {
        workbook.sheet("Sheet1").cell(i + 2, 1).value(data[i].name);
        workbook.sheet("Sheet1").cell(i + 2, 2).value(data[i].description);
        workbook.sheet("Sheet1").cell(i + 2, 3).value(data[i].total_todo);
        workbook.sheet("Sheet1").cell(i + 2, 4).value(data[i].total_todo_completed);
        workbook.sheet("Sheet1").cell(i + 2, 5).value(data[i].createdAt);
        workbook.sheet("Sheet1").cell(i + 2, 6).value(data[i].completeAt);
        workbook.sheet("Sheet1").cell(i + 2, 7).value(data[i].status)
    }
    return workbook.outputAsync();
}

const generateTodoOfUser = async (user_id) => {
    // Load a template
    const workbook = await XlsxPopulate.fromFileAsync("src/template/template.xlsx");
    // workbook.sheet("Sheet1").cell("A1").value("This is neat!");
    const data = await todosService.getAll({ user_id: user_id, limit: 0,extend: true});
    console.log(data)
    //header
    // const header = ["Tài khoản","Tên task" ,"Tên công việc","Mô tả", "Người thực hiện", "Tình trạng", "Ngày hoàn thành","Ngày tạo"]
    // workbook.sheet("Sheet1").cell("A1").value([
    //     header
    // ]);
    //style- format date dd-mm-yyyy
    workbook.sheet("Sheet1").column(7).width(15).hidden(false).style("numberFormat", "dd-mm-yyyy");
    workbook.sheet("Sheet1").column(8).width(15).hidden(false).style("numberFormat", "dd-mm-yyyy");
    for (let i = 0; i < data.length; i++) {
        workbook.sheet("Sheet1").cell(i + 2, 1).value(data[i].user.username);
        workbook.sheet("Sheet1").cell(i + 2, 2).value(data[i].task.name);
        workbook.sheet("Sheet1").cell(i + 2, 3).value(data[i].name);
        workbook.sheet("Sheet1").cell(i + 2, 4).value(data[i].description);
        workbook.sheet("Sheet1").cell(i + 2, 5).value(data[i].user.name);
        workbook.sheet("Sheet1").cell(i + 2, 6).value(data[i].completed?"Hoàn thành":"Chưa hoàn thành");
        workbook.sheet("Sheet1").cell(i + 2, 7).value(data[i].completeDate)
        workbook.sheet("Sheet1").cell(i + 2, 8).value(data[i].createdAt)
    }
    return workbook.outputAsync();
}

const generateReport = async () => {
    // Load a template
    const workbook = await XlsxPopulate.fromFileAsync("src/template/template.xlsx");
    // workbook.sheet("Sheet1").cell("A1").value("This is neat!");
    const todo = await todosService.getAll({});
    const user = await userService.getAll({});
    const task = await taskService.getAll({});
    const join = await joinTaskService.getAll({});
    //header
    // const header = ["Tài khoản","Tên task" ,"Tên công việc","Mô tả", "Người thực hiện", "Tình trạng", "Ngày hoàn thành","Ngày tạo"]
    // workbook.sheet("Sheet1").cell("A1").value([
    //     header
    // ]);
    //style- format date dd-mm-yyyy
    
    // workbook.sheet("Sheet1").column(7).width(15).hidden(false).style("numberFormat", "dd-mm-yyyy");
    // workbook.sheet("Sheet1").column(8).width(15).hidden(false).style("numberFormat", "dd-mm-yyyy");
    for (let i = 0; i < user.length; i++) {
        workbook.sheet("user").cell(i + 2, 1).value(user[i].id);
        workbook.sheet("user").cell(i + 2, 2).value(user[i].username);
        workbook.sheet("user").cell(i + 2, 3).value(user[i].name);
    }
    console.log(task)
    for (let i = 0; i < task.length; i++) {
        workbook.sheet("task").cell(i + 2, 1).value(task[i].id);
        workbook.sheet("task").cell(i + 2, 2).value(task[i].name);
    }
    for (let i = 0; i < join.length; i++) {
        workbook.sheet("join").cell(i + 2, 1).value(join[i].user_id);
        workbook.sheet("join").cell(i + 2, 2).value(join[i].task_id);
    }
    // for (let i = 0; i < todo.length; i++) {
    //     workbook.sheet("Sheet1").cell(i + 2, 1).value(data[i].user.username);
    //     workbook.sheet("Sheet1").cell(i + 2, 2).value(data[i].task.name);
    //     workbook.sheet("Sheet1").cell(i + 2, 3).value(data[i].name);
    //     workbook.sheet("Sheet1").cell(i + 2, 4).value(data[i].description);
    //     workbook.sheet("Sheet1").cell(i + 2, 5).value(data[i].user.name);
    //     workbook.sheet("Sheet1").cell(i + 2, 6).value(data[i].completed?"Hoàn thành":"Chưa hoàn thành");
    //     workbook.sheet("Sheet1").cell(i + 2, 7).value(data[i].completeDate)
    //     workbook.sheet("Sheet1").cell(i + 2, 8).value(data[i].createdAt)
    // }
    return workbook.outputAsync();
}

export {
    generateTask,
    generateTodoOfUser,
    generateReport
};
