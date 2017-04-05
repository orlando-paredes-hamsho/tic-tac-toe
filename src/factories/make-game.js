import make_board from './make-board';
import request_user_action from '../utility/request-user-action';

const make_game = () => {
	
	const board = make_board();
	
	return {
		draw_board() {
			const renderedBoard = board.render();
			console.log(renderedBoard);
			return renderedBoard;
		},
		start() {
			this.draw_board();
			request_user_action('What is your motivation').then(function (reply) {
				console.log('user replied', reply);
			}).finally(process.exit);
		}
	};
};

export default make_game;

