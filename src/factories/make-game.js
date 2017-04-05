import make_board from './make-board';
import request_user_action from '../utility/request-user-action';

/**
 * make_game() makes a tic tac toe game.
 */
const make_game = () => {
	
	//We instantiate a board from our factory to use in our game.
	const board = make_board();
	
	return {
		/**
		* draw_board() outputs a rendered board to the console
		* @return string representation of the rendered board
		**/
		draw_board() {
			const renderedBoard = board.render();
			console.log(renderedBoard);
			return renderedBoard;
		},
		/**
		* start() begins a full tic-tac-toe game loop
		**/
		start() {
			this.draw_board();
			request_user_action('What is your motivation').then(function (reply) {
				console.log('user replied', reply);
			}).finally(process.exit);
		}
	};
};

export default make_game;

