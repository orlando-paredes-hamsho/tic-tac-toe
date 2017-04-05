function make_board() {	
	
	const board = {
		spaces: {
			1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null
		},
		render_space(space) {
			return (this.spaces[space]) ? this.spaces[space]: space;
		},
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
	
	return Object.create(board);
}



export default make_board;