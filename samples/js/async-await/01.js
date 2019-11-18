const fetch = require('node-fetch');

async function getZhiHuColumn(id)
{
	const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
	const response = await fetch(url);
	const column = await response.json();
	console.log(`Name: ${column.name}`);
	console.log(`Intor: ${column.intro}`);
}

getZhiHuColumn('feweekly');