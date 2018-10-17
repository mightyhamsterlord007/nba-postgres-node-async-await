import Router from 'express-promise-router';
import {
  getAllTeams,
  getOneTeam,
  getAllPlayers,
  getAllPlayersDateAndStats,
  getSinglePlayer,
  getSinglePlayerStatus,
  getAllGames,
  getAllGamesScores,
  getSingleGameStatus,
  createTeam
} from './controllers';

const routes = Router();

routes.get('/teams', getAllTeams);

routes.get('/teams/:id', getOneTeam);

routes.get('/players', getAllPlayers, getAllPlayersDateAndStats.checkQueryInput, getAllPlayersDateAndStats.getPlayersGameStatus);

routes.get('/players/:id', getSinglePlayer);

routes.get('/players/:id/stats', getSinglePlayerStatus);

routes.get('/games', getAllGames, getAllGamesScores);

routes.get('/games/:id', getSingleGameStatus);

routes.post('/teams', createTeam);
export default routes;
