//
let fs = require('fs');

//Util
function writeDataToFile(fileDirName, data)
{
	fs.writeFile(fileDirName, data, function (err) {
		console.log(fileDirName + ': ' + err ? 'Write File failed!' : 'Saved successfully!');
	});
}

function readDataFromFile(fileDirname)
{
	return fs.readFileSync(fileDirname).toString();
}

function getDirectoryList(directory)
{
	let dirContent = {dirNames: [], fileNames: []};
	fs.readdirSync(directory)
			.forEach(function (dirItem) {
				if (fs.statSync(directory + "/" + dirItem).isDirectory())
				{
					dirContent.dirNames[dirContent.dirNames.length] = dirItem;
				}
				else
				{
					dirContent.fileNames[dirContent.fileNames.length] = dirItem;
				}
			});
	return dirContent;
}

function getDirectoryFileNames(path)
{
	return getDirectoryList(path).fileNames;
}

function getDirectoryFolderNames(path)
{
	return getDirectoryList(path).dirNames;
}

module.exports.writeDataToFile = writeDataToFile;
module.exports.readDataFromFile = readDataFromFile;
module.exports.getDirectoryList = getDirectoryList;
module.exports.getDirectoryFileNames = getDirectoryFileNames;
module.exports.getDirectoryFolderNames = getDirectoryFolderNames;