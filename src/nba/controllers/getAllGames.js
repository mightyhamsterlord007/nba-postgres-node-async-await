import { nbaDatabase } from '../nbaModel';

const getAllGames = async () => {
  return nbaDatabase.query('SELECT * FROM games');
}

const getAllPlayers = async (req, res, next) => {
  try {
    const gameDate = req.query.date;

    if (gameDate) {
      next();
      return;
    }

    const gameRecords = await getAllGames();
    const foundRecord = gameRecords[0];

    if ( foundRecord.length === 0 ) {
      res.status(400).json({
        message: 'games records are empty'
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


export default getAllPlayers;
