import Sequelize from 'sequelize';

export const playerStatusConfig = {
	game_id: {
		type: Sequelize.INTEGER
	},
	player_id: {
		type: Sequelize.INTEGER
	},
	team_id: {
		type: Sequelize.INTEGER
	},
	points: {
		type: Sequelize.INTEGER
	},
  assists: {
    type: Sequelize.INTEGER
  },
  rebounds: {
    type: Sequelize.INTEGER
  },
  nerd: {
    type: Sequelize.INTEGER
  }
}

export default playerStatusConfig;
