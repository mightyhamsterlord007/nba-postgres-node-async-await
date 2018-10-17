import { nbaDatabase } from '../nbaModel';
import { parseQueryDate } from './getAllPlayersDateAndStats';

const getGameScore = async (date) => {
  return nbaDatabase.query(`
                            SELECT games.id,
                                   games.date,
                                   homeTeam.name as "home_team_name",
                                   gameStates.home_team_score as home_team_score,
                                   awayTeam.name as "away_team_name",
                                   gameStates.away_team_score as away_team_score FROM games
                                JOIN teams as homeTeam
                                ON homeTeam.id = games.home_team_id
                                JOIN teams as awayTeam
                                ON awayTeam.id = games.away_team_id
                                JOIN game_states as gameStates
                                ON gameStates.game_id = games.id
                             WHERE games.date = '${date}';
                            `);
}

const getAllGamesScores = async (req, res) => {
  try {
    const gameDate = req.query.date;

    const parsedDate = parseQueryDate(gameDate);

    if (parsedDate.match(/[a-z]/ig)) {
      res.status(400).json({
        confirmation: 'failure',
        error: parsedDate
      });
      return;
    }

    const gameRecords = await getGameScore(parsedDate);
    const foundRecord = gameRecords[0];

    if( foundRecord.length === 0 ) {
      res.status(400).json({
        message: 'There are no games on that date'
      });
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

export default getAllGamesScores;
