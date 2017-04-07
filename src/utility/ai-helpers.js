/**
* get_random_corner(corners) returns a random corner from a corner's object
* @return {String} chosen corner
**/
export const get_random_corner = (corners) => {
	return corners[Math.round(Math.random()*(corners.length - 1))];
};


/**
* get_opposite_corner(main_corner, corners) returns a opposite corner to a given corner in a 3x3 grid
* @return {String} opposite corner
**/
export const get_opposite_corner = (main_corner, corners) => {
	let opposite_corner;
	corners.forEach((corner) => {
		// Opposite corners in a 3x3 grid are always separated by multiples of 4
		const result = Math.abs(corner-main_corner); 
		if (result > 0 && result % 4 === 0) opposite_corner = corner;
	});
	return opposite_corner;
};

/**
* get_furthest_corner_from_edge(edge) returns the furthest corner (numerically)
* @return {String} furthest corner
**/
export const get_furthest_corner_from_edge = (edge) => {
	if(edge % 2 === 1 || edge === 0) throw 'This method is meant for edges (pair numbered spaces)';
	return (edge > 5) ? '1' : '9';
};