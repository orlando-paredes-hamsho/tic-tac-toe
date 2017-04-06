import make_board from './factories/make-board';
import make_player from './factories/make-player';
import request_user_action from './utility/request-user-action';
import victory from './utility/victory';

/**
 * make_game module exposes a tick tack toe game
 * @return {Object} game
 **
 * game object
 * @method {String} draw_board()
 * @method {Void} start()
 */
const game = ((make_board, make_player, victory_conditions) => {
	
	let board, player1, player2;
	/**
	* draw_board() outputs a rendered board to the console
	**/
	const draw_board = () => {
		console.log(board.render());
	};
	
	return {
		/**
		 * request_player_move(players) recursively call's itself for the duration of a game loop.
		 **/
		request_player_move({current_player, next_player}) {
			draw_board();
			return request_user_action(`Player '${current_player.marker}', please choose a space to occupy (use the numbers on the board)`)
				.then((space) => {
					const was_space_occupied = board.occupy({space, marker: current_player.marker});
					const space_claimed = current_player.claim_space(was_space_occupied);
					if (victory_conditions.claim_victory(current_player.spaces_claimed)) {
						draw_board();
						console.log(`Player '${current_player.marker}', wins`);
						this.start();
					} else {
						const next_player_set = this.select_next_player_set(space_claimed, {current_player,next_player});
						this.request_player_move(next_player_set);
					}
				});
		},
		/**
		* start() begins a full tic-tac-toe game loop
		**/
		start() {
			return request_user_action('Do you wish to start a new game? (Y/N)').then(
				(response) => {
					switch(response.toUpperCase()) {
					case 'Y':
						board = make_board();
						player1 = make_player('o');
						player2 = make_player('x');
						this.request_player_move({current_player: player1, next_player: player2});
						break;
					case 'N':
						console.log('Well Alright then');
						process.exit();
						break;
					default:
						console.log('Nope, don\'t know what that means.');
						this.start();
						break;
					}
					
				}
			);
		},
		select_next_player_set({success, error}, {current_player, next_player}) {
			let next_player_set = {current_player:next_player, next_player:current_player};
			if (!success) {
				console.log(error);
				next_player_set = {current_player, next_player};
			}
			return next_player_set;
		}
		
	};
})(make_board, make_player, victory);

export default game;