const prompt = require('prompt');

console.log('Game Started');
prompt.start();

prompt.get(['Your Move?'], (err, result) => {
	console.log('Your Move was: ' + result);
});