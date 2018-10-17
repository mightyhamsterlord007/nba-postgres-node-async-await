import Sequelize from 'sequelize';

export const teamsConfig = {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING
	},
	city: {
		type: Sequelize.STRING
	},
	full_name: {
		type: Sequelize.STRING
	},
	abbrev: {
		type: Sequelize.STRING
	},
	timestamp: Sequelize.DATE
}

export default teamsConfig;
