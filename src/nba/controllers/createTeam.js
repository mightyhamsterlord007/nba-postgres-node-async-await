import {nbaDatabase} from '../nbaModel';

const createTeam = async(team) => {
    return nbaDatabase.query(
        `
         INSERT INTO teams(name, city, full_name, abbrev)
         VALUES('${team.name}', '${team.city}', '${team.full_name}', '${team.abbrev}')
         `);
}

const getAllPlayers = async(req, res) => {
    try {

        const teamData = req.body;

        const createdTeam = await createTeam(teamData);

        res.status(200).json({confirmation: 'success', result: createdTeam})

    } catch (error) {
        console.log(error)
        res.status(500).json({error});
        return;
    }
}

export default getAllPlayers;
