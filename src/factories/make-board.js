/**
 * make_board() makes a tic tac toe board.
 * @return {Object} board
 ** 
 * board object
 * @prop {Object} spaces
 * @method {String} render_space({Number} space)
 * @method {Object} occupy({Object} {{Number} space, {String} marker })
 * @method {String} render()
 */
function make_board() {	
	
	// Board Prototype
	const board = {
		// 9 spaces in our board, all of them empty
		spaces: {
			1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null
		},
		/**
		* render_space(space) decides what string to output for a given space
		* @param {Number} space, whatever space on the board we want to render
		* @return {String} value inside the space, or the space number itself
		**/
		render_space(space) {
			return (this.spaces[space]) ? this.spaces[space] : space;
		},
		/**
		* occupy({space, marker}) places a given marker on a space on the board
		* @param {Number} space, whatever space on the board we want to occupy
		* @param {String} marker, the marker we'll use to represent the player that occupies the space.
		* @return {Object} with boolean success, and either an error message or the space that got occupied.  
		**/
		occupy({space, marker}) {
			if (this.spaces[space]) {
				return { success: false, error: 'This space is already taken' };
			} else if (this.spaces.hasOwnProperty(space)) {
				this.spaces[space] = marker;
				return {success: true, space};
			} else {
				return { success: false, error: 'That space is not in the board' };
			}
		},
		/**
		* render() returns the current state of the board
		* @return {String} representation of the current state of the board 
		**/
		render() {
			//TODO: Switch to template string
			return (
				'|---|---|---|\n' + 
				'| ' + this.render_space(1) + ' | ' + this.render_space(2) + ' | ' + this.render_space(3) + ' |\n' +
				'|---|---|---|\n' +
				'| ' + this.render_space(4) + ' | ' + this.render_space(5) + ' | ' + this.render_space(6) + ' |\n' +
				'|---|---|---|\n' +
				'| ' + this.render_space(7) + ' | ' + this.render_space(8) + ' | ' + this.render_space(9) + ' |\n' +
				'|---|---|---|\n' 
			);
		}
	};
	
	// Create a new object with board as it's prototype
	return Object.create(board);
}



export default make_board;