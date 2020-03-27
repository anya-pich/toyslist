
const API_BASE = '/api/v1';
const toys = document.getElementById('toys');

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

// const deleteCookie = (name) => {
//   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
// }

// open modal on load if no zipcode cookie
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

const setZip = (zipcode) => {
  document.getElementById('zipInput').setAttribute('placeholder', zipcode);
  document.getElementById('zipButton').innerText = 'Clear';
};

// GET ALL USERS
// fetch(`${API_BASE}/profiles`)
//   .then((stream) => stream.json())
//   .then(res => render(res))
//   .catch((err) => console.log(err));

  // get all toys from a zip code
// fetch(`${API_BASE}/profiles?zipcode=${userZipcode}`)
//   .then((stream) => stream.json())
//   .then(res => render(res))
//   .catch((err) => console.log(err));

// TEMP API CALL
// render(TEMP_CITIES);

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
    <div id="${toy._id}" class="card">
      <img src="${toy.images[0]}" class="card-img-top" alt="${toy.title}" />
      <div class="card-body">
        <h5>${toy.title}</h5>
        <p class="card-text">${toy.description}</p>
        <p class="card-text text-muted float-left">${toy.price}</p>
        <a href="profile/${profile._id}/toy/${toy._id}" class="btn btn-primary float-right">View</a>
      </div>
    </div>
  </div>`
  ), '');
};



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




