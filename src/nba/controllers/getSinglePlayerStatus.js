import { nbaDatabase } from '../nbaModel';

const getStatus = async (id) =>{
  return nbaDatabase.query(`
                SELECT * FROM player_statuses
                JOIN "players"
                  ON "players".id = player_statuses.player_id
                WHERE "players".id = ${id}
                `
              );
}

const getPlayerStatus = async (req, res) => {
  try {
    const id = req.params.id;

    const statusRecord = await getStatus(id);
    const foundRecord = statusRecord[0];

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
    res.status(500).json({ error });
    return;
  }
}

export default getPlayerStatus;
