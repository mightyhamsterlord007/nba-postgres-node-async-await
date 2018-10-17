import { nbaDatabase } from '../nbaModel';

const getTeams = async () => {
  return nbaDatabase.query('SELECT * FROM teams LIMIT 100');
}

const getAllTeams = async (req, res) => {
  try {

    const teamRecords = await getTeams();

    if( teamRecords[0].length === 0 ) {
      res.status(400).json({
        message: 'teams records are empty'
      });
    }

    res.status(200).json({
      confirmation: 'success',
      result: teamRecords[0]
    });
    return;
  } catch (error) {
    res.status(500).json({ error });
    return;
  }
}

export default getAllTeams;
