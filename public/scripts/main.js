
const API_BASE = '/api/v1';
const toys = document.getElementById('toys');
// const profileId = window.location.pathname.split('/')[2];

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
  // console.log(profilesArr);
  toys.innerHTML = '';

  const toyTemplates = profilesArr.map((profile) => getToyTemplates(profile)).join('');
  // console.log(toyTemplates);
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
      <div>
        <a href="profile/${profile._id}/toy/${toy._id}" class="btn btn-primary mr-4 mb-3 float-right">View</a>
      </div>
      <div class="card-footer text-center">
        <small class="text-muted">Posted by ${profile.name}</small>
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

// // log in and go to main page
// const loginForm = document.getElementById('loginForm');
// loginForm.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const email = document.getElementById('emailInputL').value.split('@').join('%40');
//   // console.log(email);
//   const userDataL = {
//     email,
//   };
//     // console.log(JSON.stringify(userDataL));

//   fetch('/api/v1/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'credentials': 'include', // This must be included in all API requests until user logs out
//     },
//     body: JSON.stringify(userDataL),
//   })
//     .then((stream) => stream.json())
//     .then((res) => {
//       if (res.status === 200) {
//         window.location = `/`;
//       } else {
//         console.log(res);
//       }
//     })
//     .catch((err) => console.log(err));

//////////////////////////////////////
//   // log in and go to main page
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

////////////////////////////////////////


// sign up and go to profile
const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('nameInputS').value;
  const email = document.getElementById('emailInputS').value;
  const phone = document.getElementById('phoneInputS').value;
  const zipcode = document.getElementById('zipcodeInputS').value;

  const userDataS = {
    name,
    email,
    phone,
    zipcode,
  };

  console.log(JSON.stringify(userDataS));

  fetch(`/api/v1/profiles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userDataS),
  })
    .then((stream) => stream.json())
    .then((res) => {
      // console.log(res._id);
      // if (res.status === 201) {
      // window.location = '/profile';
      // } else {
      window.location = `/main/${res._id}/profile/${res._id}`;      
    // }
    })
    .catch((err) => console.log(err));
})




// switch between modal
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





