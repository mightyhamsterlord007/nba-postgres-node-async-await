import { nbaDatabase } from '../nbaModel';

const getStatus = async (id) =>{
  return nbaDatabase.query(`
                            SELECT games.id,
                                   games.date,
                                   homeTeam.name as "home_team_name",
                                   gameStates.home_team_score as home_team_score,
                                   awayTeam.name as "away_team_name",
                                   gameStates.away_team_score as away_team_score,
                                   gameStates.quarter as quarter,
                                   gameStates.time_left_in_quater,
                                   gameStates.game_status
                                   FROM games
                               JOIN teams as homeTeam
                               ON homeTeam.id = games.home_team_id
                               JOIN teams as awayTeam
                               ON awayTeam.id = games.away_team_id
                               JOIN game_states as gameStates
                               ON gameStates.game_id = games.id
                           WHERE games.id = ${id}
                            `);
}

const getSingleGameStatus = async (req, res) => {
  try {
    const id = req.params.id;

    const teamRecord = await getStatus(id);
    const foundRecord = teamRecord[0];

    if ( foundRecord.length === 0 ) {
      return res.status(404).json({error: 'Sorry record does not exist!'});
    }

    if (!foundRecord || foundRecord === null || foundRecord === undefined) {
      return res.status(500).json({error: 'error with your database'});
    }

    res.status(200).json({
      confirmation: 'success',
      result: foundRecord
    });
    return;
  } catch (error) {
    res.status(500).json({ error});
    return;
  }
}

export default getSingleGameStatus;
