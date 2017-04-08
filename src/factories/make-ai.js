import _ from 'lodash';
import victory from '../utility/victory';
import {get_random_corner, get_opposite_corner, get_furthest_corner_from_edge} from '../utility/ai-helpers';
import get_game_score from '../utility/minimax';

/**
* make_ai factory
* @return {Object} ai
** 
* ai object
* @prop {string} type
* @method {String} move
*/

const make_ai = (type = 'perfect') => {
	
	// @private full_board - constant for full array of board spaces
	const full_board = [ '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	// @private corners - constant for corners of the board
	const corners = ['1', '3', '7', '9'];
	// @private center - constant for center of the board
	const center = '5';
	// @private win_conditions - instance of win_conditions form the victory utility
	const {win_conditions} = victory;
	
	const get_move = (player_spaces,opponent_spaces) => {
		let posible_spaces, score, scores;
		const moves = {}, depth = 0;
		const available_spaces = get_available_spaces(player_spaces, opponent_spaces).sort(() => {return 0.5 - Math.random();});
		available_spaces.forEach( (space) => {
			posible_spaces = [...player_spaces, space];
			score = get_game_score(posible_spaces, opponent_spaces, 0);
			if (score === 0) {
				scores = _.flattenDeep(get_available_moves(posible_spaces, opponent_spaces, depth, false));
				moves[space] = scores.reduce((x, y) => x + y) / scores.length;
			} else {
				moves[space] = score;
			}
		});
		return Object.keys(moves).reduce((a, b) => { return moves[a] > moves[b] ? a : b; });
	};
	
	
	const get_available_moves = (player_spaces, opponent_spaces, depth, ai_turn = true) => {
		let posible_spaces, score;
		const available_spaces = get_available_spaces(player_spaces, opponent_spaces);
		if (ai_turn) {
			return available_spaces.map( (space) => {
				posible_spaces = [...player_spaces, space];
				score = get_game_score(posible_spaces, opponent_spaces, depth);
				return (score === 0 && available_spaces.length > 1) 
					? get_available_moves(posible_spaces, opponent_spaces, depth + 1, !ai_turn) 
					: score;
			});
		} else {
			return available_spaces.map( (space) => {
				posible_spaces = [...opponent_spaces, space];
				score = get_game_score(player_spaces, posible_spaces, depth);
				return (score === 0 && available_spaces.length > 1) 
					? get_available_moves(player_spaces, posible_spaces, depth + 1, !ai_turn) 
					: score;
			});
		}
	};
	
	/**
	* @private get_available_spaces(player_spaces, opponent_spaces)
	* @param {Array} player_spaces
	* @param {Array} opponent_spaces
	* @return {Array} Unoccupied spaces
	**/
	const get_available_spaces = (player_spaces, opponent_spaces) => {
		return _.difference(full_board.sort(), player_spaces.sort(),opponent_spaces.sort());
	};
	
	/**
	* @private first_move(available_spaces) make the best posible choice for first move
	* If the center is available, take the center, else take a corner
	* @param {Array} available_spaces
	* @return {String} the chosen move
	**/
	const first_move = (available_spaces) => {
		return (available_spaces.indexOf(center.toString()) > -1) ? center : get_random_corner(corners);
	};
	
	/**
	* @private get_available_win_conditions({win_conditions, opponent_spaces})
	* Return win conditions that contain none of the opponent's spaces
	* @param {Array} win_conditions
	* @param {Array} opponent_spaces
	* @return {Array} win_conditions that contain none of the opponent's spaces
	**/
	const get_available_win_conditions = ({win_conditions, opponent_spaces}) => {
		return win_conditions.filter((condition) => {
			// Check that both arrays have nothing in common
			return (_.difference(condition, opponent_spaces).length === 3);
		});
	};
	
	/**
	* @private filter_win_conditions({available_win_conditions, opponent_spaces})
	* @param {Array} available_win_conditions
	* @param {Array} player_spaces
	* @return {Array} spaces that fulfill Win Conditions
	**/
	const filter_win_conditions = ({available_win_conditions, player_spaces}) => {
		let move;
		return available_win_conditions.map((condition) => {
			// Check the similarities in between both arrays
			move = _.difference(condition, player_spaces);
			// If we're one move away from fulfilling the condition, return that move
			if(move.length === 1) return move[0];
		});
	};
	
	/**
	* @private get_significant_moves({player_spaces, opponent_spaces, available_spaces})
	* @param {Array} available_spaces
	* @param {Array} player_spaces
	* @param {Array} opponent_spaces
	* @return {Array} player win conditions that are available on the board
	**/
	const get_significant_moves = ({player_spaces, opponent_spaces, available_spaces}) => {
		// Get the Win Conditions that our player can fulfill
		const available_win_conditions = get_available_win_conditions({win_conditions, opponent_spaces});
		
		// Get the Win Conditions that are available on the board
		return _.intersection(available_spaces, filter_win_conditions({available_win_conditions, player_spaces}));
	};
	
	/**
	* @private choose_move({player_spaces, opponent_spaces, available_spaces})
	* @param {Array} available_spaces
	* @param {Array} player_spaces
	* @param {Array} opponent_spaces
	* @return {String} Move carefully chosen by the AI
	**/
	const choose_move = ({player_spaces, opponent_spaces, available_spaces}) => {
		let available_corners; // Initialize variable for available corners
		// Get the moves that get the current player closest to winning
		const offensive_moves = get_significant_moves({player_spaces, opponent_spaces, available_spaces});
		// Get the moves that keep the current player from losing
		const defensive_moves = get_significant_moves({player_spaces: opponent_spaces, opponent_spaces: player_spaces, available_spaces});
		
		// Prioritize moves that make us win
		if(offensive_moves.length > 0) {
			return offensive_moves[0];
		} else if (defensive_moves.length > 0) {
			return defensive_moves[0];
		}
		
		//We went first and it's turn 2
		if(opponent_spaces.length === 1 && corners.indexOf(opponent_spaces[0]) > -1) {
			//Opponent picked a corner
			return get_opposite_corner(opponent_spaces[0], corners);
		} else if(opponent_spaces.length === 1) {
			//Opponent picked an edge
			return get_furthest_corner_from_edge(opponent_spaces[0]);
		}
		
		//If nothing else works for some reason, return whatever, but prefer corners
		available_corners = _.intersection(available_spaces, corners);
		return (available_corners.length > 0 ) ? available_corners[0] : available_spaces[0];
	};
	
	/**
	* @public move({player_spaces, opponent_spaces})
	* @param {Array} player_spaces
	* @param {Array} opponent_spaces
	* @return {String} Move carefully chosen by the AI
	**/
	const move = ({player_spaces, opponent_spaces}) => {
		const available_spaces = get_available_spaces(player_spaces, opponent_spaces);
		return (available_spaces.length >= 8) ? first_move(available_spaces) : choose_move({player_spaces, opponent_spaces, available_spaces});
	};
	
	return {
		type, // @public {String} type, the type of AI, currently only 'perfect'
		get_move,
		move
	};
};

export default make_ai;