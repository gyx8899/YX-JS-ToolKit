let rd = require('rd'),
		fs = require('fs'),
		keyArrays = [],
		notFoundKeyData = '',
		commonPath = 'D:\\Workspace\\Projects-IPTV5(SH)\\iptv5\\app\\src\\resources\\',
		userKeys = getFileContentDirectory(fs, commonPath + "app\\", "user.properties"),
		projects = getDirectoryList(commonPath).dirNames,
		projectsKeyObject = {};

for (let project of projects)
{
	projectsKeyObject[project] = getFileContentDirectory(fs, commonPath + project + '\\', "user.properties");
}

rd.read(__dirname + '/', function (err, files) {
	if (err) throw err;

	files.filter(fileItem => {
		console.log(fileItem);
		return fileItem.includes('.jsp');
	}).forEach(function (fileItem) {
		let fileContentString = fs.readFileSync(fileItem, "utf-8").toString(),
				specialKeyCount = 0,
				fileKeyStrings = [''];
		fileKeyStrings.index = 0;

		while (fileKeyStrings && "length" in fileKeyStrings)
		{
			fileContentString = fileContentString.slice(fileKeyStrings[0].length + fileKeyStrings.index);
			fileKeyStrings = new RegExp('key=".*?"', "g").exec(fileContentString);
			if (fileKeyStrings && "length" in fileKeyStrings)
			{
				let keyString = fileKeyStrings[0].split('"')[1];
				if (keyArrays.indexOf(keyString) === -1 && !userKeys.hasOwnProperty(keyString))
				{
					keyArrays[keyArrays.length] = keyString;
					specialKeyCount++;
					if (specialKeyCount === 1)
					{
						notFoundKeyData += '\n\n\n' + fileItem;
					}
					for (let project of projects)
					{
						if (projectsKeyObject[project].hasOwnProperty(keyString))
						{
							notFoundKeyData += '\n' + `########### ${project} ###########: ${keyString}=${projectsKeyObject[project][keyString]}`;
						}
					}
					notFoundKeyData += '\n' + keyString;
				}
			}
		}
	});
	// console.log(keyArrays);
	writeDataToFile(fs, __dirname + '\\', 'notfoundkeydetail.txt', notFoundKeyData);
});

function getFileContentDirectory(fs, dir, fileName)
{

	let sourceString = fs.readFileSync(dir + fileName).toString(),
			fileContentObject = {};
	sourceString.split(/\n/)
			.filter(function (item) {
				return item.trim().split('=').length > 1;
			})
			.forEach(function (value) {
				let line = value.trim().split('=');
				fileContentObject[line[0]] = (line.length === 2 ? line[1] : value.trim().slice(line[0].length + 1));
			});
	return fileContentObject;
}

function writeDataToFile(fs, dir, fileName, data)
{
	fs.writeFile(dir + fileName, data, function (err) {
		if (err)
		{
			console.log('Write File failed!');
		}
		else
		{
			console.log(dir + fileName + " stored ok!");
		}
	});
}

function getDirectoryList(path)
{
	let dirContent = {dirNames: [], fileNames: []};
	fs.readdirSync(path)
			.forEach(function (dirItem) {
				if (fs.statSync(path + "/" + dirItem).isDirectory())
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