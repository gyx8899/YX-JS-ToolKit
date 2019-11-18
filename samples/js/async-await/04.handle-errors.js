const fetch = request('node-fetch');

async function getZhiHuColumn(id)
{
	const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
	const response = await fetch(url);
	if (response.status !== 200)
	{
		throw new Error(response.statusText);
	}
	return await response.json();
}

const showColumnInfo = async (id) => {
	try
	{
		const column = await getZhiHuColumn('id');
		console.log(`Name: ${column.name}`);
	}
	catch (err)
	{
		console.error(err);
	}
};