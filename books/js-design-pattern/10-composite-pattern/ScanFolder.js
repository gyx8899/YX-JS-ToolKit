class File {
	constructor(name)
	{
		this.name = name;
		this.parent = [];
		this.type = 'FILE';
	}

	add()
	{
		throw new Error('File can add file!');
	}

	remove()
	{
		if (!this.parent)
		{
			return ;
		}
		
		this.parent.files.splice(this.parent.files.findIndex(this), 1);
	}

	scan()
	{
		console.log(`Scan File: ${this.name}.`);
	}
}

class Folder {
	constructor(name)
	{
		this.name = name;
		this.parent = null;
		this.type = 'FOLDER';
		this.files = [];
	}

	add(file)
	{
		file.parent = this;
		this.files.push(file);
	}

	remove(file)
	{
		if (!file.parent)
		{
			return ;
		}
		this.files.splice(this.files.findIndex(file), 1);
	}

	scan()
	{
		this.files.forEach(file => {
			file.scan();
		});
	}
}