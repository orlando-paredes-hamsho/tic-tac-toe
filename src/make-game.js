import Promise from 'bluebird';
import make_board from './make-board';

const make_game = () => {
	
	const board = make_board();
	
	const ask = (question)  => {
		console.log(question);
		return new Promise(function (resolve) {
			process.stdin.once('data', function (data) {
				resolve(data.toString().trim());
			});
		});
	};
	
	return {
		draw_board() {
			const renderedBoard = board.render();
			console.log(renderedBoard);
			return renderedBoard;
		},
		start() {
			this.draw_board();
			ask('What is your motivation').then(function (reply) {
				console.log('user replied', reply);
			}).finally(process.exit);
		}
	};
};

export default make_game;

