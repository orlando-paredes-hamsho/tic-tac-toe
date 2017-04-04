import Promise from 'bluebird';


const game = {
	start() {
		ask('What is your motivation').then(function (reply) {
			console.log('user replied', reply);
		}).finally(process.exit);
	}
};

export default game;

function ask(question) {
	console.log(question);
	return new Promise(function (resolve) {
		process.stdin.once('data', function (data) {
			resolve(data.toString().trim());
		});
	});
}