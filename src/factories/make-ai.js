/**
* make_ai factory
* @return {Object} ai
**/

const make_ai = (type = 'perfect') => {
	
	const corners = [1, 3, 7, 9];
	const center = 5;
	
	const get_random_corner = () => {
		return corners[Math.round(Math.random()*3)];
	};
	
	const first_move = (empty_spaces) => {
		return (empty_spaces.indexOf(center.toString()) > -1) ? center : get_random_corner();
	};
	
	const move = (empty_spaces) => {
		if(empty_spaces.length >= 8) return first_move(empty_spaces);
	};
	
	return {
		type,
		move
	};
};

export default make_ai;