// required
let util = require('./common.js');

let path = require("path");

// npm install --save-dev node-xlsx
let xlsx2json = require("node-xlsx");

let excelPath = path.join(__dirname, "../excel/"),
		jsonPath = path.join(__dirname, "../json/"),
		fileNames = util.getDirectoryFileNames(excelPath);

for (let fileName of fileNames)
{
	let fileNameSplit = fileName.split('.'),
			jsonFileName = fileName.replace(fileNameSplit[fileNameSplit.length - 1], 'json'),
			jsonFileDirName = path.join(jsonPath, jsonFileName),
			excelFileDirName = path.join(excelPath, fileName),
			jsonData = JSON.stringify(xlsx2json.parse(excelFileDirName));
	util.writeDataToFile(jsonFileDirName, jsonData);
}




