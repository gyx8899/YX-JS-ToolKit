const fetch = require('node-fetch');

async function getZhiHuColumn(id)
{
	const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
	const response = await fetch(url);
	return await response.json();
}

getZhiHuColumn('feweekly').then(column => {
	console.log(`Name: ${column.name}`);
});