import { nbaDatabase } from '../nbaModel';

export const parseQueryDate = (queryDate) => {
  if (queryDate.length > 8 ) {
    return 'Check you date entry fornat. MMDDYYYY e.g 07072017';
  }

  let getMonth = queryDate.slice(0,2);
  const parsedMonth = parseInt(getMonth);

  let getDay = queryDate.slice(2,4);
  const parsedDate = parseInt(getDay);

  let getYear = queryDate.slice(4, queryDate.length);
  const parsedYear = parseInt(getYear);

  const currentYear = new Date().getFullYear();
  let parsedGameDay;

  if (parsedMonth > 12) {
    return 'check your month input';
  }

  if (parsedDate > 31) {
    return 'check your date input from 1 to 31, depending on the month';
  }

  if (parsedYear > currentYear) {
    return `Check your year input. We are still at ${currentYear}`;
  }
   parsedGameDay = `${parsedMonth}/${parsedDate}/${parsedYear}`;

   return parsedGameDay;
}

const checkQueryInput = async (req, res, next) => {
  try {
    const gameDate = req.query.date;
    const parsedDate = parseQueryDate(gameDate);

    if (parsedDate.match(/[a-z]/ig)) {
      res.status(400).json({
        confirmation: 'failure',
        error: parsedDate
      });
      return;
    }

    req.parsedDate = parsedDate;
    next();
  } catch (error) {
    res.status(500).json({ error });
    return;
  }
}

const getPlayerStatus = async (date) => {
  return nbaDatabase.query(
                           `SELECT * from players
                            JOIN player_statuses
                              ON player_statuses.player_id = players.id
                            JOIN games
                              ON games.id = player_statuses.game_id
                            where games.date = '${date}'`
                           );
}

const parseFoundRecords = async (record) => {
  const parsedRecord = [];
  record.map(item => {
    delete item.team_id;
    delete item.game_id;
    delete item.home_team_id;
    delete item.away_team_id;
    parsedRecord.push(item);
  });
  return parsedRecord;
}

const getPlayersGameStatus= async (req, res) => {
  try {
    const parsedDate = req.parsedDate;
    const playerStatuses = await getPlayerStatus(parsedDate);

    const playerStatus = playerStatuses[0];

    if (playerStatus.length === 0) {
      res.status(400).json({
        result: 'Sorry game date does not exist'
      });
      return;
    }

    const parsedplayerStatusRecord = await parseFoundRecords(playerStatus);

    res.status(200).json({
      confirmation: 'success',
      result: parsedplayerStatusRecord
    });
    return;
  } catch (error) {
    res.status(500).json({ error });
    return;
  }
}

export default {
  getPlayersGameStatus,
  checkQueryInput
}
