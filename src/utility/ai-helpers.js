export const get_random_corner = (corners) => {
	return corners[Math.round(Math.random()*3)];
};

export const get_opposite_corner = (main_corner, corners) => {
	let opposite_corner;
	corners.forEach((corner) => {
		const result = Math.abs(corner-main_corner);
		if (result > 0 && result % 4 === 0) {
			opposite_corner = corner;
		}
	});
	return opposite_corner;
};

export const get_furthest_corner_from_edge = (edge) => {
	if(edge % 2 === 1 || edge === 0) throw 'This method is meant for edges (pair numbered spaces)';
	return (edge > 5) ? '1' : '9';
};