var interval = 10;
var nflgpGenerator = {
	id: "nflgp",
	gameDuration: 3,
	scheduleParams: {
		season: {
			selected: '',
			list: [1,2,3,4]
		},
		gameType: {
			selected: '',
			list: [1,2,3,4]
		},
		week: {
			selected: '',
			list: [1,2,3,4]
		}
	},
	getScheduleApi: function (season, gameType, week) {
		var nflServer = 'https://gamepass.nfl.com/',
				scheduleAPIDefault = 'schedule?format=json&callback=?',
				scheduleAPI = 'schedule?format=json&season={season}&gametype={gameType}&week={week}',
				resultAPI = nflServer;
		if (!season && !gameType && !week)
		{
			resultAPI += scheduleAPIDefault;
		}
		else
		{
			resultAPI += scheduleAPI.replace('{season}', season).replace('{gameType}', gameType).replace('{week}', week);
		}
		return resultAPI;
	},

	getGameTask: function (game) {
		// nflgp,57267,2017|2017092400,0/30 * 7-12 22 09 ? 2017,CST
		return "nflgp," + game.statsId + "," + game.season + "|" + game.extId + ",";
	},

	getScheduleTasks: function (game) {
		var ret = [];
		// nflgp.schedule,__,,0/30 * 8-20 1 10 ? 2017,ET
		// nflgp.schedule,2017_2_4,,0/30 * 8-20 1 10 ? 2017,ET
		// nflgp.stats,reg_4,2017,0/30 * 8-20 1 10 ? 2017,ET
		var season = game.season,
				gameType = game.type,
				week = game.week,
				gameTypeStr = game.type == "0" ? "pre" : "reg";

		ret[ret.length] = "nflgp.schedule,__,,";
		ret[ret.length] = "nflgp.schedule," + season + "_" + gameType + "_" + week + ",,";
		ret[ret.length] = "nflgp.stats," + gameTypeStr + "_" + week + "," + season + ",";
		ret[ret.length] = "nflgp.scores,__,,";
		return ret;
	}
};
var nbaGenerator = {
	id: "nba",
	gameDuration: 4,
	scheduleParams: {
		date: {
			selected: getFirstDayOfTheWeek(),
			list: []
		}
	},
	getDate: function (date){
		return (date ? date : getFirstDayOfTheWeek())
	},

	getScheduleApi: function (date) {
		return "https://watch.nba.com/schedule?date=" + this.getDate(date) + "&format=json&callback=?";
	},

	getGameTask: function (game) {
		// nba,0011700058,2017,0/30 * 10-14 11 10 ? 2017,CST
		return "nba," + game.extId + "," + game.season + ",";
	},

	getScheduleTasks: function (game) {
		// nba.schedule,10_9,2017,0/30 * 10-14 11 10 ? 2017,CST
		var firstDayOfTheWeek = getFirstDayOfTheWeek(new Date(game.date));
		var season = game.season,
				weekDay = parseInt(firstDayOfTheWeek.split("-")[1], 10) + "_" + parseInt(firstDayOfTheWeek.split("-")[2], 10);
		return ["nba.schedule," + weekDay + "," + season + ","];
	}
};
var generators = {};
generators[nflgpGenerator.id] = nflgpGenerator;
generators[nbaGenerator.id] = nbaGenerator;

var timezones = [
	["ET", "America/New_York"],
	["CST", "Asia/Shanghai"],
	["GMT", "Etc/GMT+0"]
];

function convertTimezone(dateStr, timezone)
{
	var timestamp = new Date(dateStr).getTime();
	var offset = moment.tz.zone(timezone).offset(new Date(dateStr).getTime());
	return new Date(timestamp - offset * 60 * 1000);
}

function getGameInfo(game, duration)
{
	if (!game) return;
	var gameDate, startHour, endHour, timezone = null;
	for (var i = 0; i < timezones.length; i++)
	{
		gameDate = convertTimezone(game.dateTimeGMT + "Z", timezones[i][1]);
		startHour = gameDate.getUTCHours() - 1;
		endHour = gameDate.getUTCHours() + duration + (gameDate.getUTCMinutes() > 0 ? 1 : 0);
		if (startHour >= 0 && endHour <= 23)
		{
			timezone = timezones[i][0];
			break;
		}
	}
	if (timezone == null)
	{
		alert("Out of range: " + JSON.stringify(game));
		return;
	}
	var day = gameDate.getUTCDate(),
			month = gameDate.getUTCMonth() + 1,
			year = gameDate.getUTCFullYear();
	return {
		startHour: startHour,
		endHour: endHour,
		day: day,
		month: month,
		year: year,
		timezone: timezone
	};
}

function gameDateIsContinuous(gameInfo, nextGameInfo)
{
	return gameInfo.timezone == nextGameInfo.timezone && gameInfo.year == nextGameInfo.year
			&& gameInfo.month == nextGameInfo.month && gameInfo.day == nextGameInfo.day
			&& gameInfo.endHour >= nextGameInfo.startHour
}

function getFirstDayOfTheWeek(currentDate)
{
	if (currentDate == undefined)
	{
		currentDate = new Date();
	}
	var firstDayOfTheWeek = new Date(currentDate.getTime() - (currentDate.getDay() - 1) * 1000 * 3600 * 24);
	var year = firstDayOfTheWeek.getFullYear();
	var month = firstDayOfTheWeek.getMonth() + 1;
	month = month < 10 ? "0" + month : month;
	var date = firstDayOfTheWeek.getDate();
	date = date < 10 ? "0" + date : date;
	return [year, month, date].join("-");
}

function generateTask(generatorId, callback, date)
{
	var generator = generators[generatorId];
	$.getJSON(generator.getScheduleApi(date), function (data) {
		var tasks = [];
		var gamesInTask = [];
		var scheduleGameInfoCache = null;	//[startHour, endHour, day, month, year, timezone]
		data.games && data.games.forEach(function (game) {
			if (game.isGame == "true")
			{
				gamesInTask[gamesInTask.length] = game;
			}
		});
		gamesInTask.forEach(function (game, index) {
			var gameTask = "";
			var gameInfo = getGameInfo(game, generator.gameDuration);
			gameTask += generator.getGameTask(game);
			gameTask += ["0/" + interval + " *", gameInfo.startHour + "-" + gameInfo.endHour, gameInfo.day, gameInfo.month, "?", gameInfo.year].join(" ");
			gameTask += "," + gameInfo.timezone;
			tasks[tasks.length] = gameTask;

			// Add Schedule Task
			if (scheduleGameInfoCache == null)
			{
				scheduleGameInfoCache = gameInfo;
			}
			var nextGame = index == gamesInTask.length - 1 ? null : gamesInTask[index + 1];
			var nextGameInfo = getGameInfo(nextGame, generator.gameDuration);
			if (nextGameInfo == null || !gameDateIsContinuous(gameInfo, nextGameInfo))
			{
				var scheduleTaskSegment = "0/" + interval + " * " + scheduleGameInfoCache.startHour + "-" + scheduleGameInfoCache.endHour
						+ " " + scheduleGameInfoCache.day + " " + scheduleGameInfoCache.month + " ? " + scheduleGameInfoCache.year + "," + scheduleGameInfoCache.timezone;
				var scheduleTasks = generator.getScheduleTasks(game);
				for (var i = 0; i < scheduleTasks.length; i++)
				{
					tasks[tasks.length] = scheduleTasks[i] + scheduleTaskSegment;
				}

				scheduleGameInfoCache = null;
			}
			else
			{
				scheduleGameInfoCache.endHour = gameInfo.endHour;
			}
		});

		callback && callback(tasks);
	});
}