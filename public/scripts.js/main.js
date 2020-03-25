const API_BASE = '/api/v1';
const $users = $('users');

$.ajax ({
	method: 'GET',
	url:'http://api/v1/profile'
	success: onSuccess,
	error: onError,
	});

function onSuccess (json) {
	$users.empty();
	for (let i=0; i<json.fakePeople.length; i++) {
		$users.append('json.fakePeople.name');
	};
function onError () {
	console.log('err');
};

};
