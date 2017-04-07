import make_board from './factories/make-board';
import make_player from './factories/make-player';
import make_ai from './factories/make-ai';
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
const game = ((make_board, make_player, victory_conditions, AI) => {
	
	//Setup variables
	let board, player1, player2, use_ai;
	/**
	* draw_board() outputs a rendered board to the console
	**/
	const draw_board = () => {
		console.log(board.render());
	};
	/**
	 * @protected resolve
	 **/
	const resolve = (player_victory, tie) => {
		if(player_victory) {
			return 'victory';
		} else if(tie) {
			return 'tie';
		}
		return 'continue';
	};
	
	/**
	 * @private request_ai_move(players) recursively call's itself for the duration of a game loop.
	 **/
	const request_ai_move = ({current_player, next_player}) => {
		const occupied_spaces = {
			player_spaces: current_player.get_spaces(),
			opponent_spaces: next_player.get_spaces()
		};
		const space = AI.move(occupied_spaces);
		current_player.claim_space(board.occupy({space, marker: current_player.marker}));
		console.log(`Player '${current_player.marker}', chose '${space}'`);
		request_player_move({current_player:next_player, next_player:current_player});
	};
	
	/**
	* @private choose_outcome({current_player, next_player})
	**/
	
	const choose_outcome = ({current_player, next_player}) => {
		const board_full = (board.get_empty_spaces().length === 0);
		const player_victory = victory_conditions.claim_victory(current_player.get_spaces());
		switch(resolve(player_victory, board_full)) {
		case 'victory':
			draw_board();
			console.log(`Player '${current_player.marker}', wins`);
			boot_up();
			break;
		case 'tie':
			draw_board();
			console.log('It\'s a tie!');
			boot_up();
			break;
		case 'continue':
			if (use_ai) {
				request_ai_move({current_player:next_player, next_player:current_player});
			} else {
				request_player_move({current_player:next_player, next_player:current_player});
			}
			break;
		}
	};
	
	/**
	 * @private request_player_move(players) recursively call's itself for the duration of a game loop.
	 **/
	const request_player_move = ({current_player, next_player}) => {
		draw_board();
		return request_user_action(`Player '${current_player.marker}', please choose a space to occupy (use the numbers on the board)`)
			.then((space) => {
				const space_claimed = current_player.claim_space(board.occupy({space, marker: current_player.marker}));
				if(space_claimed.success) {
					choose_outcome({current_player, next_player});
				} else {
					console.log(space_claimed.error);
					request_player_move({current_player, next_player});
				}
			});
	};
	/**
	* public start(ai) sets up the game
	**/
	const start = ({ai}) => {
		use_ai = ai;
		board = make_board();
		player1 = make_player('o');
		player2 = make_player('x');
		request_player_move({current_player: player1, next_player: player2});
	};
	
	/**
	* @public boot_up() begins a full tic-tac-toe game loop
	**/
	const boot_up = () => {
		console.log('Choose one of the following');
		console.log('1.- VS AI');
		console.log('2.- VS Player');
		console.log('3.- Quit');
		return request_user_action('Your Choice: ').then(
			(response) => {
				switch(response.toUpperCase()) {
				case '1':
					start({ai:true});
					break;
				case '2':
					start({ai:false});
					break;
				case '3':
					console.log('Well Alright then');
					process.exit();
					break;
				default:
					console.log('Nope, don\'t know what that means.');
					boot_up();
					break;
				}

			}
		);
	};
	
	//exposing protected and public methods
	return {
		boot_up,
		start,
		get_config() {
			return {
				board,
				player1,
				player2,
				use_ai
			};
		},
		resolve	
	};
})(make_board, make_player, victory, make_ai());

export default game;