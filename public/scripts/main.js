
// const $users = $('#users');

// $.ajax ({
// 	method: 'GET',
// 	url:`http://localhost:4000/api/v1/profiles`,
// 	success: onSuccess,
// 	error: onError,
// 	});

// function onSuccess (json) {
// 	// $users.empty();
// 	console.log("ok");


// };
// function onError(json) {
// 	console.log("Error");
// };

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
//           <a href="/$users/${user._id}" class="btn btn-primary float-right">View</a>
//         </div>
//       </div>
//     </div>
//   `;
// }
//////////////////////////////////////////////

console.log('Cities Index JS...');
const API_BASE = '/api/v1';
const users = document.getElementById('users');


// GET ALL USERS
fetch(`${API_BASE}/profiles`)
  .then((stream) => stream.json())
  .then(res => render(res))
  .catch((err) => console.log(err));

// TEMP API CALL
// render(TEMP_CITIES);

function render(usersArray) {
  console.log('Rendering Users Array ', usersArray)
  const userTemplates = usersArray.map((user) => getUserTemplate(user)).join('');
  users.insertAdjacentHTML('beforeend', userTemplates);
}

function getUserTemplate(user) {
  console.log('Getting User Template');
  return `
    <div class="col-md-4 mb-4">
      <div id="${user.toys[0]._id}" class="card">
        <img src="${user.toys[0].images}" class="card-img-top" alt="${user.toys[0].title}" />
        <div class="card-body">
          <h5>${user.toys[0].title}</h5>
          <p class="card-text">${user.toys[0].description}</p>
          <a href="/profiles/${user.toys[0]._id}" class="btn btn-primary float-right">View</a>
        </div>
      </div>
    </div>
  `;
}



//////////////////////////////////////////////
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









