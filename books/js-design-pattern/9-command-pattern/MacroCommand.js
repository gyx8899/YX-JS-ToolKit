class MacroCommand {
	constructor()
	{
		this.commandList = [];
	}

	add(command)
	{
		this.commandList.push(command);
	}

	remove(command)
	{
		this.commandList.slice(this.commandList.indexOf(command), 1);
	}

	execute()
	{
		this.commandList.forEach(command => {
			command.execute();
		})
	}
}