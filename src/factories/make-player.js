/**
 * make_player(marker) makes a tic tac toe player.
 * @param {String} marker to identify the player
 * @return {Object} player
 ** 
 * player object
 * @prop {String} marker
 * @method {Array} get_spaces
 * @method {Object} claim_space({Object} {{Boolean} success, {Number} space, {String} error })
 */
const make_player = (marker) => {
	const valid_markers = ['x','o']; // @private valid_markers - only 'x' and 'o' allowed
	const spaces_claimed = []; // @private spaces_claimed - Array of claimed spaces
	
	// If it's not a valid marker, throw an error
	if (valid_markers.indexOf(marker) === -1) throw 'Valid marker values are \'x\' and \'o\'';
	
	return {
		// @public marker - String to identify the player
		marker,
		/**
		* @public claim_space(space) if we successfully claimed a space, add it to our spaces claimed.
		* @param {Boolean} success
		* @param {Number} space that we want to claim
		* @param {String} error in case we had one
		* @return {Object} containing success and error
		**/
		claim_space({success, space, error = ''}) {
			if(success && !space) return {success: false, error: 'No space was provided'};
			if (success) spaces_claimed.push(space);
			return {success, error};
		},
		/**
		* @ public get_spaces() returns the spaces we have claimed
		* @return {Array} spaces claimed
		**/
		get_spaces() {
			return spaces_claimed;
		}
	};
};

export default make_player;
