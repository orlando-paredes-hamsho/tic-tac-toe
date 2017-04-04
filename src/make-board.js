function make_board() {	
	
	return {
		spaces: {
			1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null
		},
		renderSpace(space) {
			return (this.spaces[space]) ? this.spaces[space]: space;
		},
		render() {
			return (
				'|---|---|---|\n' + 
				'| ' + this.renderSpace(1) + ' | ' + this.renderSpace(2) + ' | ' + this.renderSpace(3) + ' |\n' +
				'|---|---|---|\n' +
				'| ' + this.renderSpace(4) + ' | ' + this.renderSpace(5) + ' | ' + this.renderSpace(6) + ' |\n' +
				'|---|---|---|\n' +
				'| ' + this.renderSpace(7) + ' | ' + this.renderSpace(8) + ' | ' + this.renderSpace(9) + ' |\n' +
				'|---|---|---|\n' 
			);
		}
	};
}



export default make_board;