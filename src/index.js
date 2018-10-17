import app from './app';
import { nbaDatabase } from './nba';

const { PORT = 3000 } = process.env;

nbaDatabase.sync({ logging: false, force: false})
	.then(function connectToPS() {
		app.listen(PORT, () => {
			console.log('nba database connected');
			console.log('listening on port', PORT);
		});
}).catch(console.error);
