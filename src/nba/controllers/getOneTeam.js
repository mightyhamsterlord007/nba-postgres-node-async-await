import { nbaDatabase } from '../nbaModel';

const getTeam = async (id) =>{
  return nbaDatabase.query(`SELECT * FROM teams where id = ${id}`);
}

const getOneTeam = async (req, res) => {
  try {
    const id = req.params.id;

    const teamRecord = await getTeam(id);
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

export default getOneTeam;
