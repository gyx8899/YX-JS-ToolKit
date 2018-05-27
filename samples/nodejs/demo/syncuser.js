// 1. Replace with your projectId
let projectId = "id";

// 2. Open current path in terminal

// Config
let fs = require('fs');

let projectsConfig = {
			'projectId': {
				"name": "siteName",
				"email": "supportEmail",
				"tos": "tos"
			}
		},
		customProjectConfig = projectsConfig[projectId],
		userFileFullName = "user.properties",
		commonUserFilePath = "",
		projectUserFilePath = "../../../../" + projectId + "/src/resources/" + projectId + "/",
		commonUserContent = readDataFromFile(commonUserFilePath + userFileFullName),
		projectUserContent = readDataFromFile(projectUserFilePath + userFileFullName),
		customUserContent = replaceContent(commonUserContent, customProjectConfig),
		customCommonKeyValues = getContentObject(customUserContent),
		projectCommonKeyValues = getContentObject(projectUserContent),
		diffKeyValues = getDiffObjectKeyValues(customCommonKeyValues, projectCommonKeyValues),
		diffString = objectToString(diffKeyValues),
		processedCommonContent = commentedOutKey(removeHeadComment(customUserContent), diffKeyValues);

writeDataToFile(projectUserFilePath + 'user.properties', processedCommonContent + diffString);

function removeHeadComment(content)
{
	return content.replace(content.split('#Seo title/desc/keywords')[0], '');
}

//Util
// let fs = require('fs');

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

function replaceContent(sourceContent, replacedKeyValues)
{
	let result = sourceContent;
	for (let key in replacedKeyValues)
	{
		result = result.replace(new RegExp(key, "g"), replacedKeyValues[key]);
	}
	return result;
}

// eg: key=value
function getContentObject(content)
{
	let fileContentObject = {};
	content.split(/\n/)
			.filter(function (item) {
				return item.trim().split('=').length > 1;
			})
			.forEach(function (value) {
				let line = value.trim().split('=');
				fileContentObject[line[0]] = (line.length === 2 ? line[1] : value.trim().slice(line[0].length + 1));
			});
	return fileContentObject;
}

function getDiffObjectKeyValues(source, target)
{
	let diff = {};
	for (let key in target)
	{
		if (!(key in source) || (source[key] !== target[key]))
		{
			diff[key] = target[key];
		}
	}
	console.log(diff);
	return diff;
}

// eg: {key: value} ==>  key=value
function objectToString(object)
{
	let result = "";
	for (let key in object)
	{
		if (key.indexOf('#') !== 0)
		{
			result += '\n' + key + '=' + object[key];
		}
	}
	return result;
}

function commentedOutKey(content, keyValues)
{
	let processed = content;
	for (let key in keyValues)
	{
		if (key.indexOf('#') === 0)
		{
			processed = processed.replace(new RegExp('\n' + key.split('#')[1] + '=', "g"), '\n' + key + '=');
		}
		else
		{
			processed = processed.replace(new RegExp('\n' + key + '=', "g"), '\n' + '#' + key + '=');
		}
	}
	return processed.trim();
}