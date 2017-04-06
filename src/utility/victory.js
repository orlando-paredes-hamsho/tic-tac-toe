import _ from 'lodash';

const victory = {
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