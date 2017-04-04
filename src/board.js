const board = {
	spaces: {
		1: ' ', 2: ' ', 3: ' ', 4: ' ', 5: ' ', 6: ' ', 7: ' ', 8: ' ', 9: ' '
	},
	render() {
		return (
			'|---|---|---|\n' + 
			'| ' + this.spaces[1] + ' | ' + this.spaces[2] + ' | ' + this.spaces[3] + ' |\n' +
			'|---|---|---|\n' +
			'| ' + this.spaces[4] + ' | ' + this.spaces[5] + ' | ' + this.spaces[6] + ' |\n' +
			'|---|---|---|\n' +
			'| ' + this.spaces[7] + ' | ' + this.spaces[8] + ' | ' + this.spaces[9] + ' |\n' +
			'|---|---|---|\n' 
		);
	}
};

export default board;