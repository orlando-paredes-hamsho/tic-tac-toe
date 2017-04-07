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
	
	// @private spaces - 9 spaces in our board, all of them initialized empty
	const spaces = {
		1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null
	};
	
	// Board Prototype
	const board = {
		/**
		* @public get_spaces() returns the spaces object
		* @return {Object} spaces
		**/
		get_spaces() {
			return spaces;
		},
		/**
		* @public get_empty_spaces() returns the empty spaces in the board
		* @return {Array} value of the empty spaces in the array
		**/
		get_empty_spaces() {
			return Object.getOwnPropertyNames(spaces).filter((space) => {
				return !spaces[space];
			});
		},
		/**
		* @public render_space(space) decides what string to output for a given space
		* @param {Number} space, whatever space on the board we want to render
		* @return {String} value inside the space, or the space number itself
		**/
		render_space(space) {
			return (spaces[space]) ? spaces[space] : space;
		},
		/**
		* @public occupy({space, marker}) places a given marker on a space on the board
		* @param {Number} space, whatever space on the board we want to occupy
		* @param {String} marker, the marker we'll use to represent the player that occupies the space.
		* @return {Object} with boolean success, and either an error message or the space that got occupied.  
		**/
		occupy({space, marker}) {
			if (spaces[space]) {
				return { success: false, error: 'This space is already taken' };
			} else if (spaces.hasOwnProperty(space)) {
				spaces[space] = marker;
				return {success: true, space};
			} else {
				return { success: false, error: 'That space is not in the board' };
			}
		},
		/**
		* @public render() returns the current state of the board
		* @return {String} representation of the current state of the board 
		**/
		render() {
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