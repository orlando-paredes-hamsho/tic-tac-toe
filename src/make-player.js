const make_player = ({marker}) => {
	const valid_markers = ['x','o'];
	
	if (valid_markers.indexOf(marker) === -1) {
		throw 'Valid marker values are \'x\' and \'o\'';
	}
	
	return {
		spaces_claimed: [],
		marker,
		move(space) {
			return { space, marker:this.marker };
		},
		claim_space({success, space, error = ''}) {
			if (success) {
				this.spaces_claimed.push(space);
			} else {
				throw error;
			}
		}
	};
};

export default make_player;