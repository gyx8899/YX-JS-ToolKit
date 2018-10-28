function findIndex(array, item)
{
	let ret = -1;
	for (let i = array.length - 1; i > 0; i--)
	{
		if (array[i] === item)
		{
			ret = i;
			break;
		}
	}
	return ret;
}
function spliceArrayItem(array, item)
{
	let index = findIndex(array, item);
	if (index === -1)
	{
		return array;
	}
	return array.splice(index, 1);
}

class DirectoryOperation {
	constructor()
	{
		this.players = [];
	}

	addPlayer(player)
	{
		let teamColor = player.teamColor;
		this.players[teamColor] = this.players[teamColor] || [];
		this.players[teamColor].push(player);

		return this;
	}

	removePlayer(player)
	{
		let teamColor = player.teamColor;
		this.players[teamColor] = this.players[teamColor] || [];

		this.players[teamColor] = spliceArrayItem(this.players[teamColor], player);

		return this;
	}

	changeTeam(player, newTeamColor)
	{
		if (newTeamColor === player.teamColor)
		{
			return this;
		}
		this.removePlayer(player);

		player.teamColor = newTeamColor;
		this.addPlayer(player);

		return this;
	}

	playerDead(player)
	{
		let teamColor = player.teamColor,
				teamPlayers = this.players[teamColor];

		let playerTeamAllDead = !teamPlayers.contains(teamPlayer => teamPlayer.state === 'live');

		if (playerTeamAllDead)
		{
			teamPlayers.forEach(teamPlayer => {
				teamPlayer.lose();
			});

			for (let color in this.players)
			{
				if (color !== teamColor)
				{
					this.players[color].forEach(teamPlayer => teamPlayer.win());
				}
			}
		}
	}
}

class PlayerDirectory {
	constructor()
	{
		this.operations = new DirectoryOperation();
	}

	receiveMessage(msgType, player)
	{
		let message = [].shift.call(arguments);
		this.operations[message].apply(this, arguments);
		return this;
	}
}

let playerDirectory = new PlayerDirectory();

class Player {
	constructor(name, teamColor)
	{
		this.name = name;
		this.state = 'live';
		this.teamColor = teamColor;
	}

	win()
	{
		console.log(`Win: ${this.name}`);
	}

	lose()
	{
		console.log(`Lose: ${this.name}`);
	}

	die()
	{
		this.state = 'die';

		playerDirectory.receiveMessage('playerDead', this);
	}

	remove()
	{
		playerDirectory.receiveMessage('removePlayer', this);
	}

	changeTeam(teamColor)
	{
		this.teamColor = teamColor;
		playerDirectory.receiveMessage('changeTeam', this, color);
	}
}

class PlayerFactory {
	constructor()
	{
		this.players = [];
		this.names = {};
	}

	addPlayer(name, teamColor)
	{
		if (!this.names[name])
		{
			alert(`Name: ${name} has been used, please try to use another one!`);
			return this;
		}
		let newPlayer = new Player(name, teamColor);

		playerDirectory.receiveMessage('addPlayer', newPlayer);
		this.names[name] = name;

		return newPlayer;
	}

	removePlayer(name)
	{
		if (!this.names[name])
		{
			alert(`Name: ${name} has not been used by any player!`);

			return this;
		}
		delete this.names[name];

		return this;
	}
}