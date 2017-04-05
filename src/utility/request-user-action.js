import Promise from 'bluebird';

/**
* request_user_action(request) asks the user to take a given action.
* @param {String} request, a message to explain what action the user is expected to take or what options they have.
* @return {Promise} Promise that, when resolved, gives back the user input.
**/
const request_user_action = (request)  => {
	console.log(request); //Show the request on the console.
	return new Promise(function (resolve) {
		//Expect the user to perform a given action
		process.stdin.once('data', function (data) {
			//Once we have our user data, we resolve the promise and give back the result
			resolve(data.toString().trim());
		});
	});
};

export default request_user_action;