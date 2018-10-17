import { nbaDatabase } from '../nbaModel';

const getPlayer = async (id) =>{
  return nbaDatabase.query(`SELECT * FROM players where id = ${id}`);
}

const getSinglePlayer = async (req, res) => {
  try {
    const id = req.params.id;

    const playerRecord = await getPlayer(id);
    const foundRecord = playerRecord[0];

    if ( foundRecord.length === 0 ) {
      return res.status(404).json({error: 'Sorry player does not exist!'});
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

export default getSinglePlayer;
