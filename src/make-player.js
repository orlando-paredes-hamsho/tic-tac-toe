const make_player = ({marker}) => {
	const valid_markers = ['x','o'];
	
	if (valid_markers.indexOf(marker) === -1) {
		throw 'Valid marker values are \'x\' and \'o\'';
	}
	return {
		marker
	};
};

export default make_player;