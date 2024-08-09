const ExcelJS = require('exceljs');
const path = require('path');


export default async function readExcelFile(filePath) {
    const workbook = new ExcelJS.workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.worksheets[0];

    const data = [];
    worksheet.eachRow({includeEmpty: true}, (row, rowNumber) => {
        data.push(row.values);
    });

    return data;
}