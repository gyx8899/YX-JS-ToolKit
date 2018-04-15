let fs = require('fs'),
		projectIds = ['insight', 'ufc', 'nflgp', 'nba', 'crtv', 'site_12'],
		totalKeyValueInfo = {},
		commonKeyValues = [];

init();

function init()
{
	statisticalProjects(projectIds);

	commonKeyValues = getCommonKeyValueArray();
	saveDataToFile(fs, '\\app\\', 'test.properties', commonKeyValues);
	// saveDataToFile(fs, '\\app\\', 'common.properties', commonKeyValues);
}

function statisticalProjects(projectIds)
{
	projectIds.forEach(function (projectId) {
		let projectKeyObject = getFileContentDirectory(fs, __dirname + '\\' + projectId + '\\', 'user.properties');
		Object.keys(projectKeyObject).forEach(function (keyItem) {
			if (totalKeyValueInfo.hasOwnProperty(keyItem))
			{
				totalKeyValueInfo[keyItem]['count'] += 1;
				totalKeyValueInfo[keyItem]['diff'] += (projectKeyObject[keyItem] === totalKeyValueInfo[keyItem].value ? 0 : 1);
			}
			else
			{
				totalKeyValueInfo[keyItem] = {
					count: 1,
					diff: 0,
					key: keyItem,
					value: projectKeyObject[keyItem],
					projects: {}
				};
			}
			totalKeyValueInfo[keyItem]['projects'][projectId] = projectKeyObject[keyItem];
		});
	});
}

function getCommonKeyValueArray()
{
	let resultArray = [];
	Object.keys(totalKeyValueInfo)
			.filter(function (keyItem) {
				return totalKeyValueInfo[keyItem]['count'] > 1;
			}).map(function (keyItem) {
		let propertyItem = totalKeyValueInfo[keyItem];

		if (propertyItem['diff'] === 0)
		{
			resultArray[resultArray.length] = {
				key: propertyItem.key,
				value: propertyItem.value
			};
		}
		else
		{
			// Add null value item after diff > 1:
			resultArray[resultArray.length] = {
				key: "",
				value: ""
			};
			Object.keys(propertyItem['projects'])
					.map(function (projectId) {
						resultArray[resultArray.length] = {
							key: propertyItem.key,
							value: propertyItem['projects'][projectId]
						};
					});
			// Add null value item after diff > 1:
			resultArray[resultArray.length] = {
				key: "",
				value: ""
			};
		}
	});
	return resultArray;
}

function saveDataToFile(fs, dir, fileName, dataArray)
{
	let dataString = dataArray.map(function (dataItem) {
		return getKeyValueStringFormat(dataItem.key, dataItem.value);
	}).join('');
	writeDataToFile(fs, __dirname + dir, fileName, dataString);
}

function getKeyValueStringFormat(keyItem, value)
{
	if (keyItem === "" && value === "")
	{
		return '\n';
	}
	return (keyItem + '=' + value + '\n');
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
			console.log(dir + " " + fileName + " stored ok!");
		}
	});
}

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