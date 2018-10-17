import { nbaDatabase } from '../nbaModel';

const getPlayers = async () => {
  return nbaDatabase.query(`
                              SELECT players.id,
                                     players.name,
                                     team.name as "team",
                                     team.abbrev
                                     FROM players
                              JOIN teams as team
                              ON team.id = players.team_id;
                          `);
}

const getAllPlayers = async (req, res, next) => {
  try {
    const gameDate = req.query.date;

    if (gameDate) {
      next();
      return;
    }

    const playersRecords = await getPlayers();

    if( playersRecords[0].length === 0 ) {
      res.status(400).json({
        message: 'player records are empty'
      });
    }

    res.status(200).json({
      confirmation: 'success',
      result: playersRecords[0]
    });
    return;
  } catch (error) {
    res.status(500).json({ error});
    return;
  }
}


export default getAllPlayers;
