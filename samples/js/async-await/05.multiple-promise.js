const fetch = require('node-fetch');

const sleep = (timeout = 2000) => new Promise(resolve => {
	setTimeout(resolve, timeout);
});

async function getZhiHuColumn(id) {
	await sleep(2000);
	const url = `https://zhuanlan.zhihu.com/api/column/${id}`;
	const response = await fetch(url);
	return await response.json();
}

const showColumnInfo = async () => {
	console.time('ShowColumnInfo');

	const feweekly = await getZhiHuColumn('feweekly');
	const toolingtips = await getZhiHuColumn('toolingtips');

	console.log(`Name: ${feweekly.name}`);
	console.log(`Name: ${toolingtips.intro}`);
	console.timeEnd('ShowColumnInfo');
}