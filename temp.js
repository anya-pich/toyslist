
const API_BASE = '/api/v1';
// const nav = require('./navbar.js');
const toys = document.getElementById('toys');
let zipcode = localStorage.getItem('zipcode');

////////////////////////////////////////////////////////////////////////////////////////////

// Navbar

let navRef = 
  `<nav class="navbar navbar-expand-md navbar-dark bg-dark pt-3 pb-3 mb-5">
    <div class="container">
      <a class="navbar-brand" href="/">TOYSLIST</a>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav ml-auto">
          <form class="form-inline md-form ml-auto mb-1" action="/search" method="post">
            <input class="form-control mr-sm-2" type="text" placeholder="Search" value="" name="search">
            <button class="btn btn-outline-primary btn-rounded btn-md mr-lg-5" type="submit">Search</button>
          </form>
          <form id="zipcodeForm" class="form-inline md-form ml-auto mb-1" action="/cookie" method="post">
            <input class="form-control mr-sm-2" type="text" placeholder="Enter Zipcode here" value="" name="zipcode" id="zipInput">
            <button class="btn btn-outline-primary btn-rounded btn-md mr-lg-5" type="submit" id="zipButton">Enter</button>
          </form>
          <form class="form-inline md-form ml-auto mb-1">
            <li class="nav-item">
              <a class="nav-link btn" data-toggle="modal" data-target="#signUpModal">Sign up</a>
            </li>
            <li class="nav-item">
                <a class="nav-link btn" data-toggle="modal" data-target="#loginModal">Login</a>
            </li>
          </form>
        </ul>
      </div>
    </div>
  </nav>`


// zipcode

const zipSet = (value) => {
  console.log('running zipSet');
  localStorage.setItem('zipcode', value);
  console.log(localStorage.getItem('zipcode'));
  document.getElementById('zipcodeForm').innerHTML = 
    `<button class="btn btn-outline-secondary btn-rounded btn-md mr-lg-5" type="submit" id="zipX">${value}  x</button>`;
  toysByZipcode(value);
}

const zipUnset = () => {
  document.getElementById('zipcodeForm').innerHTML = 
    `<input class="form-control mr-sm-2" type="text" placeholder="Enter Zipcode here" value="" name="zipcode" id="zipInput">
    <button class="btn btn-outline-primary btn-rounded btn-md mr-lg-5" type="submit" id="zipButton">Enter</button>`
  localStorage.removeItem('zipcode');
  console.log(localStorage.getItem('zipcode'));
  toysAll();
}

// load toy cards

const toysAll = () => {
  console.log('rendering all');
  fetch(`${API_BASE}/profiles`)
    .then((stream) => stream.json())
    .then(res => render(res))
    .catch((err) => console.log(err));
}

const toysByZipcode = (value) => {
  console.log('rendering by zip');
  fetch(`${API_BASE}/profiles?zipcode=${zipcode}`)
    .then((stream) => stream.json())
    .then(res => render(res))
    .catch((err) => console.log(err));
}

const toysBySearch = (value) => {
  fetch(`${API_BASE}/toys?q=${value}`)
    .then((stream) => stream.json())
    .then(res => render(res))
    .catch((err) => console.log(err));
}

// navbar controls

let navbar = document.getElementById('navbar');
navbar.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(event.target.id);
  switch (event.target.id){
    case 'zipButton':
      zipSet(document.getElementById('zipInput').value);
      break;
    case 'zipX':
      zipUnset();
      break;
    // case searchButton:
    //   search();
    //   break;
    // case loginButton:
    //   loginStart();
    //   break;
    // case signupButton:
    //   signupStart();
    //   break;
    // case profileButton:
    //   profileGo();
    //   break;
    // case cartButton:
    //   cartGo();
    //   break;
  }
})



// log in and go to main page
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('emailInputL').value.split('@').join('%40');
  console.log(email);
  fetch(`/api/v1/profiles?email=${email}`, {
    method: 'GET'
  })
    .then((stream) => stream.json())
    .then((res) => {
      console.log(res);
      window.location = `/main/${res}`;
    })
    .catch((err) => console.log(err));
})

// sign up and go to profile

// sign up and go to ???

const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('nameInput').value;
  const email = document.getElementById('emailInputS').value;
  const phone = document.getElementById('phoneInput').value;
  const zipcode = document.getElementById('zipcodeInput').value;

  const userDataS = {
    name,
    email,
    phone,
    zipcode,
  };

  fetch(`/api/v1/profiles?email=${email}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((stream) => stream.json())
    .then((res) => {
      if (res.status === 201) {
        window.location = '/login';
      } else {
      window.location = `/profile/${res}`;      }
    })
    .catch((err) => console.log(err));
})

$(document).on("click","#switchToLogin",function(){
  $('#signUpModal').modal('hide');
  $('#loginModal').modal('show');
});


$(document).on("click","#switchToSignUp",function(){
  $('#loginModal').modal('hide');
  $('#signUpModal').modal('show');
});

$(document).on("click","#switchToLogin",function(){
  $('#signUpModal').modal('hide');
  $('#loginModal').modal('show');
});




////////////////////////////////////////////////////////////////////////////////////////////

// Body

// render toys to html
const render = (profilesArr) => {
  toys.innerHTML = '';
  const toyTemplates = profilesArr.map((profile) => getToyTemplates(profile)).join('');
  toys.insertAdjacentHTML('beforeend', toyTemplates);
};

// get concatenated toy templates for each profile
function getToyTemplates(profile) {
  return profile.toys.reduce((accumulator, toy) => accumulator.concat(
  `<div class="col-md-3 mb-4">
    <div id="${toy._id}" class="card h-100 shadow rounded">
      <img src="${toy.images[0]}" class="card-img-top" alt="${toy.title}" />
      <div class="card-body">
        <h5 class="card-title text-truncate">${toy.title}</h5>
        <p class="card-text text-truncate">${toy.description}</p>
        <h6 class="card-subtitle text-muted">${toy.price}</h6>
      </div>
      <div class="card-footer p-2 container">
        <div class="row">
          <div class="col-sm-6 pr-1">
            <a href="profile/${profile._id}/toy/${toy._id}" class="btn w-100 btn-sm btn-outline-primary btn-block">View</a>
          </div>
          <div class="col-sm-6 pl-1">
            <button type="button" class="btn w-100 btn-sm btn-outline-primary add" id="${toy._id}">Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>`
  ), '');
};






// add item to user cart
document.getElementById('toys').addEventListener('click', (event) => {
  if (event.target.classList.contains('add')) {
    if (checkLoginStatus()) {

      fetch(`/api/v1/profile/${profileID}/favs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({toyId: event.target.id}),
      })
        .then((stream) => stream.json())
        .then((res) => {
          if (res.status === 201) {
            event.target.innerText = "Added";
          }
        })
        .catch((err) => console.log(err));

    } else {
      $('#loginModal').modal('show');
    }
  }
});





// on load


document.addEventListener('DOMContentLoaded', function(){
  if (zipcode) {
    console.log('loading cards by zip');
    zipSet(zipcode);
  } else {
    console.log('loading all cards');
    zipUnset();
  }

});















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



