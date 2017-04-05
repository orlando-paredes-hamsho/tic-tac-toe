import Promise from 'bluebird';

const request_user_action = (request)  => {
	console.log(request);
	return new Promise(function (resolve) {
		process.stdin.once('data', function (data) {
			resolve(data.toString().trim());
		});
	});
};

export default request_user_action;