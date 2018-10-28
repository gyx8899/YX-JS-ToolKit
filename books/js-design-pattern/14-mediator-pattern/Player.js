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
class Player {
	constructor(name, teamColor)
	{
		this.name = name;
		this.partners = [];
		this.enemies = [];
		this.state = 'live';
		this.teamColor = teamColor;
	}

	win()
	{
		console.log(`Win: ${this.name}`);
	}

	lose()
	{
		this.state = 'die';
		console.log(`Lose: ${this.name}`);
	}

	die()
	{
		this.lose();

		let all_dead = !this.partners.includes(partner => {
			return partner.state === 'live';
		});

		if (all_dead)
		{
			this.partners.forEach(partner => {
				partner.lose();
			});
			this.enemies.forEach(enemy => {
				enemy.win();
			})
		}

		this.enemies.forEach(enemy => {
			enemy.win();
		})
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

		this.players.forEach(player => {
			if (player.teamColor === teamColor)
			{
				player.partners.push(newPlayer);
				newPlayer.partners.push(player);
			}
			else
			{
				player.enemies.push(newPlayer);
				newPlayer.enemies.push(player);
			}
		});

		this.players.push(newPlayer);
		this.names[name] = name;

		return this;
	}

	removePlayer(name)
	{
		if (!this.names[name])
		{
			alert(`Name: ${name} has not been used by any player!`);

			return this;
		}
		let namePlayerTeamColor = null;
		let thisPlayer = null;

		this.players.splice(this.players.findIndex(player => {
			let hasFound = player.name === name;
			if (hasFound)
			{
				thisPlayer = player;
				namePlayerTeamColor = player.teamColor;
			}
			return hasFound;
		}), 1);

		this.players.forEach(player => {
			if (player.teamColor === namePlayerTeamColor)
			{
				player.partners = spliceArrayItem(player.partners, thisPlayer);
			}
			else
			{
				player.enemies = spliceArrayItem(player.enemies, thisPlayer);
			}
		});

		return this;
	}
}