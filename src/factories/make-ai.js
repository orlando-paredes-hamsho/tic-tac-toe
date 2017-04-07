import _ from 'lodash';
import victory from '../utility/victory';
import {get_random_corner, get_opposite_corner, get_furthest_corner_from_edge} from '../utility/ai-helpers';

/**
* make_ai factory
* @return {Object} ai
**/

const make_ai = (type = 'perfect') => {
	
	const full_board = [ '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	const corners = ['1', '3', '7', '9'];
	const center = '5';
	const {win_conditions} = victory;
	
	const get_available_spaces = (player_spaces, opponent_spaces) => {
		return _.difference(full_board.sort(), player_spaces.sort(),opponent_spaces.sort());
	};
	
	const first_move = (available_spaces) => {
		return (available_spaces.indexOf(center.toString()) > -1) ? center : get_random_corner(corners);
	};
	
	const get_available_win_conditions = ({win_conditions, opponent_spaces}) => {
		return win_conditions.filter((condition) => {
			return (_.difference(condition, opponent_spaces).length === 3);
		});
	};
	
	const filter_win_conditions = ({available_win_conditions, player_spaces}) => {
		let move;
		return available_win_conditions.map((condition) => {
			move = _.difference(condition, player_spaces);
			if(move.length === 1) return move[0];
		});
	};
	
	const get_significant_moves = ({player_spaces, opponent_spaces, available_spaces}) => {
		const available_win_conditions = get_available_win_conditions({win_conditions, opponent_spaces});
		return _.intersection(available_spaces, filter_win_conditions({available_win_conditions, player_spaces, opponent_spaces}));
	};
	
	const choose_move = ({player_spaces, opponent_spaces, available_spaces}) => {
		const offensive_moves = get_significant_moves({player_spaces, opponent_spaces, available_spaces});
		const defensive_moves = get_significant_moves({player_spaces: opponent_spaces, opponent_spaces: player_spaces, available_spaces});
		let available_edges;
		
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
		
		//If nothing else works for some reason, return whatever, but prefer edges
		available_edges = _.difference(available_spaces, corners);
		return (available_edges.length > 0 ) ? available_edges[0] : available_spaces[0];
	};
	
	const move = ({player_spaces, opponent_spaces}) => {
		const available_spaces = get_available_spaces(player_spaces, opponent_spaces);
		return (available_spaces.length >= 8) ? first_move(available_spaces) : choose_move({player_spaces, opponent_spaces, available_spaces});
	};
	
	return {
		type,
		move
	};
};

export default make_ai;