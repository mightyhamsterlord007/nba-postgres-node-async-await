import Sequelize from 'sequelize';

export const gameStateConfig = {
	game_id: {
		type: Sequelize.INTEGER
	},
	home_team_score: {
		type: Sequelize.INTEGER
	},
	away_team_score: {
		type: Sequelize.INTEGER
	},
  broadcast: {
    type: Sequelize.STRING
  },
  quarter: {
    type: Sequelize.INTEGER
  },
  time_left_in_quarter: {
    type: Sequelize.STRING
  },
  game_status: {
    type: Sequelize.STRING
  }
}

export default gameStateConfig;
