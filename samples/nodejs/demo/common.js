//
let fs = require('fs');

//Util
function writeDataToFile(fileDirName, data)
{
	fs.writeFile(fileDirName, data, function (err) {
		console.log(fileDirName + ': ' + (err ? 'Write File failed!' : 'Saved successfully!'));
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

function getNodeArgs() {
	const args = {};
	process.argv
			.slice(2, process.argv.length)
			.forEach(arg => {
				// long arg
				if (arg.slice(0, 2) === '--') {
					const longArg = arg.split('=');
					const longArgFlag = longArg[0].slice(2, longArg[0].length);
					args[longArgFlag] = longArg.length > 1 ? longArg[1] : true;
				}
				// flags
				else if (arg[0] === '-') {
					const flags = arg.slice(1, arg.length).split('');
					flags.forEach(flag => {
						args[flag] = true;
					});
				}
			});
	return args;
}

function getDiffFolderFileNames(sourceFolder, destFolder) {
	let sourceFiles = getDirectoryFileNames(sourceFolder),
			destFiles = getDirectoryFileNames(destFolder);
	let sourceFileNames = new Set(sourceFiles.map((name) => {
						return name.slice(0, name.lastIndexOf('.'));
					})),
			destFileNames = new Set(destFiles.map((name) => {
						return name.slice(0, name.lastIndexOf('.'));
					}));
	let difference = new Set(
	    [...sourceFileNames].filter(x => !destFileNames.has(x)));
	return Array.from(difference).map(filename => {
		for (let i = 0; i < sourceFiles.length; i++) {
			if (sourceFiles[i].indexOf(filename) === 0) {
				return sourceFiles[i];
			}
		}
	});
}

module.exports.writeDataToFile = writeDataToFile;
module.exports.readDataFromFile = readDataFromFile;
module.exports.getDirectoryList = getDirectoryList;
module.exports.getDirectoryFileNames = getDirectoryFileNames;
module.exports.getDirectoryFolderNames = getDirectoryFolderNames;
module.exports.getNodeArgs = getNodeArgs;
module.exports.getDiffFolderFileNames = getDiffFolderFileNames;