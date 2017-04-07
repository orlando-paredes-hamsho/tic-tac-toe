import _ from 'lodash';

/**
* victory module holds victory conditions and the claim victory method.
* @prop {Array} win_conditions
* @method {Boolean} claim_victory
**/
const victory = {
	// @public win_conditions - Array of different winning combinations
	win_conditions: [
		['1', '2', '3'],
		['4', '5', '6'],
		['7', '8', '9'],
		['1', '4', '7'],
		['2', '5', '8'],
		['3', '6', '9'],
		['1', '5', '9'],
		['3', '5', '7']
	],
	/**
	* @public claim_victory(claimed_spaces) check claimed spaces against win_conditions
	* @param {Array} claimed_spaces
	* @return {Boolean} true if the player has won
	**/
	claim_victory(claimed_spaces) {
		let win = false;
		this.win_conditions.forEach((condition) => {
			if(_.difference(condition.sort(), claimed_spaces.sort()).length === 0) {
				win = true;
			}
		}); 
		return win;
	}
};

export default victory;