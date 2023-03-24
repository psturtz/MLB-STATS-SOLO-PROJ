const statsController = {};

statsController.getRoster = async (req, res, next) => {
  res.locals.players = [];
  await fetch(`https://statsapi.mlb.com/api/v1/teams/${req.params.teamId}/roster`)
  .then((res) => res.json())
  .then((data) => {
    data.roster.forEach(el => {
      const { id } = el.person;
      const { fullName } = el.person;
      const position = el.position.abbreviation
      const player = {
        id,
        fullName,
        position,
      }
      res.locals.players.push(player)
    });
    next();
  })
  .catch((error) => next({
    log: `Error message: ${error}`,
    message: {
      err: 'Error retrieving team',
    },
  }))
}

statsController.getUpcomingOpponents = async (req, res, next) => {
  const { teamId } = req.params

  const startDate = new Date()
  const secondsEndDate = Date.parse(startDate) + 1500000000;
  const endDate = new Date(secondsEndDate).toISOString().slice(0, 10);
  const newStartDate = startDate.toISOString().slice(0, 10);
  await fetch(
    `https://statsapi.mlb.com/api/v1/schedule?teamId=${teamId}&sportId=1&startDate=${newStartDate}&endDate=${endDate}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.dates, "HERE");
      res.locals.upcoming = [];
      const cache = []
      data.dates.forEach((el) => {
        if (
          el.games[0].teams.away.team.id != teamId &&
          !cache.includes(el.games[0].teams.away.team.id)
        ) {
          const upcoming = {
            teamId: el.games[0].teams.away.team.id,
            name: el.games[0].teams.away.team.name,
          };
          res.locals.upcoming.push(upcoming);
          cache.push(upcoming.teamId)
        } else if (!cache.includes(el.games[0].teams.home.team.id)) {
          const upcoming = {
            teamId: el.games[0].teams.home.team.id,
            name: el.games[0].teams.home.team.name,
          };
          res.locals.upcoming.push(upcoming);
          cache.push(upcoming.teamId);
        }
      });
      const set = new Set(res.locals.upcoming)
      console.log(set)
      next();
    })
    .catch((error) =>
      next({
        log: `Error message: ${error}`,
        message: {
          err: 'Error retrieving upcoming teams',
        },
      })
    );
}


statsController.getMatchup = async (req, res, next) => {
  const {homePlayer, oppPlayer} = req.params;
  await fetch(
    `https://statsapi.mlb.com/api/v1/people/${homePlayer}?hydrate=stats(group=[hitting],type=[vsPlayer],opposingPlayerId=${oppPlayer},season=[2022],sportId=1)`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      res.locals.stats = data.people[0].stats.find((el => el.type.displayName == 'vsPlayerTotal')).splits[0].stat;
      next();
    })
    .catch((error) =>
      next({
        log: `Error message: ${error}`,
        message: {
          err: 'Error retrieving matchup stats',
        },
      })
    );

}

//statsapi.mlb.com/api/v1/people/547180?hydrate=stats(group=[hitting],type=[vsPlayer],opposingPlayerId=628317,season=2019,sportId=1)

https://statsapi.mlb.com/api/v1/people/547180?hydrate=stats(group=[hitting],type=[vsPlayer],opposingPlayerId=628317,sportId=1)

//https://statsapi.mlb.com/api/v1/schedule?teamId=147&sportId=1&startDate=2023-03-23&endDate=2023-04-23

module.exports = statsController;