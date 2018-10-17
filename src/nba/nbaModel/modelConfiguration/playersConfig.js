import Sequelize from 'sequelize';

export const playersConfig = {
	name: {
		type: Sequelize.STRING
	},
	team_id: {
		type: Sequelize.INTEGER
	}
}

export default playersConfig;
