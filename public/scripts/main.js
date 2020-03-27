
const API_BASE = '/api/v1';
const toys = document.getElementById('toys');

////////////////////////////////////////////////////////////////////////////////////////////

// functions

// get zipcode cookie
function getCookie(cooKey) {
  const name = cooKey + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

// change zipcode form when there is a zipcode cookie
const setZip = (zipcode) => {
  document.getElementById('zipInput').setAttribute('placeholder', zipcode);
  document.getElementById('zipButton').innerText = 'Clear';
};

// const deleteCookie = (name) => {
//   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
// }

// render toys to html
function render(profilesArr) {
  toys.innerHTML = '';
  console.log('got profiles', profilesArr);
  const toyTemplates = profilesArr.map((profile) => getToyTemplates(profile)).join('');
  console.log('got templates');
  toys.insertAdjacentHTML('beforeend', toyTemplates);
};

// get concatenated toy templates for each profile
function getToyTemplates(profile) {
  return profile.toys.reduce((accumulator, toy) => accumulator.concat(
  `<div class="col-md-4 mb-4">
    <div id="${toy._id}" class="card h-100">
      <img src="${toy.images[0]}" class="card-img-top" alt="${toy.title}" />
      <div class="card-body">
        <h5 class="card-title">${toy.title}</h5>
        <p class="card-text text-truncate">${toy.description}</p>
        <h6 class="card-subtitle mb-2 text-muted">${toy.price}</h6>
        <a href="profile/${profile._id}/toy/${toy._id}" class="btn btn-primary float-right">View</a>
      </div>
      <div class="card-footer text-center">
        <small class="text-muted">Posted ${Math.floor(((Date.now())-(new Date(toy.createdAt)))/1000/60/60)} hours ago</small>
      </div>
    </div>
  </div>`
  ), '');
};

////////////////////////////////////////////////////////////////////////////////////////////

// open zipcode modal on load if no zipcode cookie
// populate cards by zip if there is a cookie
// or else all cards
$(window).on('load',function(){
  const zipcode = getCookie('zipcode');
  if (zipcode) {
    setZip(zipcode);
    fetch(`${API_BASE}/profiles?zipcode=${zipcode}`)
      .then((stream) => stream.json())
      .then(res => render(res))
      .catch((err) => console.log(err));
  } else {
    $('#zipcodeModal').modal('show');
    fetch(`${API_BASE}/profiles`)
      .then((stream) => stream.json())
      .then(res => render(res))
      .catch((err) => console.log(err));
  }
});

// log in and go to profile

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('emailInput').value.split('@').join('%40');
  console.log(email);
  fetch(`/api/v1/profiles?email=${email}`, {
    method: 'GET'
  })
    .then((stream) => stream.json())
    .then((res) => {
      console.log(res);
      window.location = `/profile/${res}`;
    })
    .catch((err) => console.log(err));
})



























////////////////////////////////////////////////////////////////////////////////////////////

// fetch(`/profile/${id}`)df

// // go to profile
// // router.get('/profiles', (req, res) => {

//   // get button
//   // prevent default
//   // get the email and send it to the api to get id number
//   // then go to link
//   const email = (req.query.email).split('@').join('%40');
//   let profileId = '';
//   fetch(`/api/v1/profiles?email=${email}`)
//       .then(console.log('something is happening'))
//       .then((stream) => stream.json())
//       .then(profileId = res)
//       .catch((err) => console.log(err));
//   // res.redirect(`/profile/${profileId}`);
//   res.send(profileId);
//   // res.sendFile('/public/views/profile/profile.html', {
//   //     root: __dirname + '/../',
//   // });
//   // res.send(req.query.email);
// });










// function render(toysArray) {
//   const toyTemplates = toysArray.map((toy) => getToyTemplate(toy)).join('');
//   toys.insertAdjacentHTML('beforeend', toyTemplates);
// }

// function getToyTemplate(json) {
// // for(let i in user.toys) {
// // 	console.log(i);
// let toysAll = [];
// console.log(json.toys);
// for (let i=0;i<json.length;i++){
// toysAll.push(json[i].toys);
// console.log(toysAll);};
// // for(let i=0; i<toysAll.length; i++) {
//   return `
//     <div class="col-md-4 mb-4">
//       <div id="${json.toys[0]._id}" class="card">
//         <img src="${json.toys[0].images}" class="card-img-top" alt="${json.toys[0].title}" />
//         <div class="card-body">
//           <h5>${json.toys[0].title}</h5>
//           <p class="card-text">${json.toys[0].description}</p>
//           <a href="/toys/${json.toys[0]._id}" class="btn btn-primary float-right">View</a>
//         </div>
//       </div>
//     </div>
//   `;
// };
// }



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


// const $toysList = $('#toys');
// const allToys = [];

// $.ajax ({
// 	method: 'GET',
// 	url:'/api/v1/profiles',
// 	success: onSuccess,
// 	error: onError,
// 	});

// 	function getToyHtml(json) {
// 		console.log("get a toy");
// 		return `
// 		    <div class="col-md-4 mb-4">
// 	      		<div id="${json.toys[0]._id}" class="card">
// 	        		<img src="${json.toys[0].images}" class="card-img-top" alt="${json.toys[0].title}" />
// 	        		<div class="card-body">
// 	          			<h5>${json.toys[0].title}</h5>
// 	          			<p class="card-text">${json.toys[0].description}</p>
// 	          			<a href="/profiles/${json.toys[0]._id}" class="btn btn-primary float-right">View</a>
// 	        		</div>
// 	      		</div>
// 	    	</div>
// 	  	`;
// 	};

// 	function getAllToysHtml(toys) {
// 		return toys.map(getToyHtml).join('');
// 	};

// 	function render () {
// 		$toysList.empty();
// 		let toysHtml = getAllToysHtml(allToys);
// 		$toysList.append(toysHtml);
// 	};

// 	function onSuccess (json) {
// 		console.log("ok");
// 		allToys = json;
// 		render();
// 	};


// 	function onError(json) {
// 		console.log("Error");
// 	};




