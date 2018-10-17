import Sequelize from 'sequelize';
import { teamsConfig, playersConfig, gamesConfig, playerStatusConfig, gameStateConfig } from './modelConfiguration';

const config = {
	timestamps: true,
	underscored: true
}

const options = {
	dialect : 'postgres'
}

const connectionString = process.env.DATABASE_CONNECTIONSTRING || 'postgres://localhost:5432/nba-stuff';

export const nbaDatabase = new Sequelize(connectionString, options);

export const teamsTable = nbaDatabase.define('teams', teamsConfig, config);
export const playersTable = nbaDatabase.define('players', playersConfig, config);
export const gamesTable = nbaDatabase.define('games', gamesConfig, config);
export const playerStatusTable = nbaDatabase.define('player_statuses', playerStatusConfig, config);
export const gameStateTable = nbaDatabase.define('game_states', gameStateConfig, config);
