
const $users = $('#users');

$.ajax ({
	method: 'GET',
	url:`http://localhost:4000/api/v1/profiles`,
	success: onSuccess,
	error: onError,
	});

function onSuccess (json) {
	$users.empty();
	console.log("ok");
	for (let i=0; i<json.length; i++) {
		$users.append(`<h3>${json[i].name}</h3>`);
	};
};
function onError(json) {
	console.log("Error");
};

// function render(usersArray) {
//   console.log('Rendering Users Array ', usersArray)
//   const userTemplates = usersArray.map((user) => getUserTemplate(user)).join('');
//   users.insertAdjacentHTML('beforeend', userTemplates);
// }

// function getUserTemplate(user) {
//   console.log('Getting User Template');
//   return `
//     <div class="col-md-4 mb-4">
//       <div id="${user._id}" class="card">
//         <img src="${user.image}" class="card-img-top" alt="${user.name}" />
//         <div class="card-body">
//           <p class="card-text">${user.description}</p>
//           <a href="/cities/${user._id}" class="btn btn-primary float-right">View</a>
//         </div>
//       </div>
//     </div>
//   `;
// }
// $('form-inline').on('submit',function(e){
// 	e.preventDefault();
// 	$.ajax ({
// 		method: 'GET',
// 		url:'http://api/v1/profile'
// 		success: onSuccess,
// 		error: onError,
// 	});

// 	function onSuccess (json) {
// 	$users.empty();
// 		for (let i=0; i<json.fakePeople.length; i++) {
// 			$users.append('json.fakePeople.name');
// 	};
// function onError () {
// 	console.log('err');
// 	};
// };
// });









