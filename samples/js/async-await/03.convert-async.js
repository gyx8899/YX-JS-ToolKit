const fetch = require('node-fetch');

const getZhiHuColumn = async (id) => {
	const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
	const response = await fetch(url);
	return await response.json();
};

class APIClient {
	async getClumn(id)
	{
		const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
		const response = await fetch(url);
		return await response.json();
	}
}

(async () => {
	const client = new APIClient();
	const column = await client.getClumn('feweekly');
	console.log(`Name: ${column.name}`);
	console.log(`Intor: ${column.intro}`);
})();
