/**
 * make_player(marker) makes a tic tac toe player.
 * @param {String} marker to identify the player
 * @return {Object} player
 ** 
 * player object
 * @prop {Array} spaces_claimed
 * @prop {String} marker
 * @method {Object} move({Number} space)
 * @method {Void} claim_space({Object} {{Boolean} success, {Number} space, {String} error })
 */
const make_player = (marker) => {
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