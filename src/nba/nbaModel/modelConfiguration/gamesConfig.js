import Sequelize from 'sequelize';

const gamesConfig = {
	home_team_id: {
		type: Sequelize.INTEGER
	},
	away_team_id: {
		type: Sequelize.INTEGER
	},
	date: {
		type: Sequelize.STRING
	}
}

export default gamesConfig;
