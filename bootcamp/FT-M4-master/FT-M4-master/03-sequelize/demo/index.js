const express = require('express');
const morgan = require('morgan');
const { db, Op, Player, Team, PlayerTeam } = require('./db.js');

const server = express();

server.use(express.json());

server.use(morgan('dev'));

server.post('/players', async (req, res) => {
  const { firstName, lastName, username, birthday, status, skill, password } = req.body;
  try {
    const newPlayer = await Player.create({
      firstName,
      lastName,
      username,
      birthday,
      status,
      skill,
      password
    });
    res.json(newPlayer);
  } catch (error) {
    res.send(error);
  }
});

server.post('/players/bulk', async (req, res) => {
  res.json(await Player.bulkCreate(req.body));
});

server.get('/players', async (req, res) => {
  const { name } = req.query;
  const condition = name 
    ? {where: {firstName: name}}
    : {}
  condition.attributes = { exclude: ['actualizado']}
  const players = await Player.findAll(
    condition,
  );
  // console.log(players);
  // console.log(players.map(p => p.toJSON()));
  res.json(players.length ? players : 'No players found');
});

server.get('/players/pagination', async (req, res) => {
  const players = await Player.findAll(req.query);
  res.json(players.length ? players : 'No players found');
});

server.get('/players/attributes', async (req, res) => {
  const { attributes } = req.body;
  const players = await Player.findAll({
    attributes
  });
  res.json(players.length ? players : 'No players found');
});

server.get('/players/filters/and', async (req, res) => {
  const players = await Player.findAll({
    where: req.body
  });
  res.json(players.length ? players : 'No players found');
});

server.get('/players/filters/or', async (req, res) => {
  const players = await Player.findAll({
    where: {
      [Op.or]: req.body
    }
  });
  res.json(players.length ? players : 'No players found');
});

server.get('/players/id/:id', async (req, res) => {
  const { id } = req.params;
  const player = await Player.findByPk(id);
  // console.log('Skill: ', player.skill); // Getter
  res.json(player || 'Player not found');
});

server.get('/players/findorcreate', async (req, res) => {
  const { firstName, lastName, username, birthday, status, skill } = req.body;
  const [player, created] = await Player.findOrCreate({
    where: {username},
    defaults: {
      firstName,
      lastName,
      birthday,
      status,
      skill
    }
  });
  res.json({created: created, player});
});

server.get('/players/ordered', async (req, res) => {
  const { attribute, order } = req.query;
  const players = await Player.findAll({
    where: {skill: {[Op.not]: null}},
    order: [
      [attribute, order]
    ]
    // order: db.col(attribute)
  });
  res.json(players.length ? players : 'No players found');
});

server.get('/players/group', async (req, res) => {
  const { attributeGroup, attributeFn, fn } = req.query;
  const stats = await Player.findAll({
    attributes: [
      attributeGroup,
      [db.fn(fn, db.col(attributeFn)), fn]
    ],
    group: [attributeGroup]
  });
  res.json(stats.length ? stats : 'No players found');
});

server.get('/players/utility/count', async (req, res) => {
  const { attribute, value, gt } = req.query;
  const condition = gt === 'true' ? { [Op.gt]: value } : { [Op.lt]: value }
  const count = await Player.count({
    where: {
      [attribute]: condition
    }
  });
  res.json(count);
});

server.get('/players/utility/maxormin', async (req, res) => {
  const { attribute, max } = req.query;
  if(max === 'true') {
    return res.json(await Player.max(attribute));
  }
  res.json(await Player.min(attribute));
});

server.get('/players/utility/sum', async (req, res) => {
  const { attribute } = req.query;
  res.json(await Player.sum(attribute));
});

server.get('/players/:username', async (req, res) => {
  const { username } = req.params;
  const player = await Player.findOne({
    where: {username}
  });
  res.json(player || 'Player not found');
});

server.put('/players', async (req, res) => {
  const { persist } = req.query;
  const { username, status } = req.body;
  try {
    const player = await Player.findOne({
      where: {username}
    });
    player.status = status;
    if(persist) await player.save();
    // console.log(player);
    // console.log(player.toJSON());
    res.json(player);
  } catch (error) {
    res.send(error);
  }
});

server.put('/players/all', async (req, res) => {
  const response = await Player.update(
    { skill: 50 },
    {
      where: {skill: {[Op.is]: null}}
    }
  );
  res.send(`${response} players updated`);
});

server.get('/teams', async (req, res) => {
  const { name } = req.query;
  const condition = name 
  ? {where: {name}}
  : {}
  const teams = await Team.findAll(condition);
  res.json(teams);
});

server.post('/teams', async (req, res) => {
  const { name, one, two } = req.body;
  try {
    const team = await Team.create({
      name,
      one,
      two
    });
    res.json(team);
  } catch (error) {
    res.send(error);
  }
});

server.post('/teams/bulk', async (req, res) => {
  res.json(await Team.bulkCreate(req.body))
});

server.delete('/clear/:model', async (req, res) => {
  const { model } = req.params;
  if(model === 'player') 
    return res.json(await Player.destroy({
      truncate: true
    }))
  
  if(model === 'team') 
    return res.json(await Team.destroy({
      truncate: true
    }))

  if(model === 'relation') 
    return res.json(await PlayerTeam.destroy({
      truncate: true
    }))

  res.send('Worng model name');
});

server.put('/transfer', async (req, res) => {
  const { idPlayer, codeTeam } = req.body;
  const player = await Player.findByPk(idPlayer);
  res.json(await player.addTeam(codeTeam));
});

server.put('/multipletransfer', async (req, res) => {
  const { override } = req.query;
  const { idPlayer, codeTeams } = req.body;
  const player = await Player.findByPk(idPlayer);
  if(override) return res.json(await player.setTeams(codeTeams))
  res.json(await player.addTeams(codeTeams));
});

server.get('/mixins', async (req, res) => {
  const { idPlayer, codeTeam } = req.body;
  console.log('----- PLAYER -----');
  const player = await Player.findByPk(idPlayer);

  const teams = await player.getTeams();
  console.log('TEAMS: ', teams.map(t => t.toJSON()));

  const teamsCount = await player.countTeams();
  console.log('TEAMS COUNT: ', teamsCount);

  const team = await Team.findByPk(codeTeam);
  const playedInTeam = await player.hasTeam(codeTeam);
  console.log(`Played in team ${team.name}: ${playedInTeam}`)

  console.log('----- PLAYER -----');
  const players = await team.getPlayers();
  console.log('PLAYERS: ', players.map(p => p.toJSON()));

  res.sendStatus(200);
});

server.get('/eagerloading', async (req, res) => {
  // const allData = await Player.findAll({
  //   include: Team
  // });

  const allData = await Player.findAll({
    include: [{
      model: Team,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }]
  });

  res.json(allData);
});


server.get('/', (req, res) => {
  res.send('DEMO Sequelize with Express');
});

server.use('/', (req, res) => {
  res.status(404).send('Resource not found');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
  db.sync();
});