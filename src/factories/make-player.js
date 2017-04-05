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
	// Tic-tac-toe markers are only x's and o's
	const valid_markers = ['x','o'];
	
	// If it's not a valid marker, throw an error
	if (valid_markers.indexOf(marker) === -1) {
		throw 'Valid marker values are \'x\' and \'o\'';
	}
	
	return {
		// Array of claimed spaces
		spaces_claimed: [],
		// String to identify the player
		marker,
		/**
		* move(space) represents the move the player wants to make
		* @param {Number} space, whatever space on the board we want to occupy
		* @return {Object} made of {Number} space and {String} marker
		**/
		move(space) {
			return { space, marker:this.marker };
		},
		/**
		* claim_space(space) if we successfully claimed a space, add it to our spaces claimed.
		* @param {Boolean} success
		* @param {Number} space that we want to claim
		* @param {String} error in case we had one
		**/
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
