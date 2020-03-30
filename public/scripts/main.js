
const API_BASE = '/api/v1';
// const nav = require('./navbar.js');
const toys = document.getElementById('toys');
let zipcode = localStorage.getItem('zipcode');

////////////////////////////////////////////////////////////////////////////////////////////








// zipcode

const zipRender = (value) => {
  console.log('rendering zip');
  document.getElementById('zipcodeForm').innerHTML = 
  `<button class="btn btn-outline-secondary btn-rounded btn-md mr-lg-5" type="submit" id="zipX">${value}  x</button>`;
}

const zipUnset = () => {
  document.getElementById('zipcodeForm').innerHTML = 
    `<input class="form-control mr-sm-2" type="text" placeholder="Enter Zipcode here" value="" name="zipcode" id="zipInput">
    <button class="btn btn-outline-primary btn-rounded btn-md mr-lg-5" type="submit" id="zipButton">Enter</button>`
  localStorage.removeItem('zipcode');
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
  fetch(`${API_BASE}/profiles?zipcode=${value}`)
    .then((stream) => stream.json())
    .then(res => render(res))
    .catch((err) => console.log(err));
}

const toysBySearch = (value) => {
  fetch(`${API_BASE}/toys?q=${value}`) // set this up
    .then((stream) => stream.json())
    .then(res => render(res))
    .catch((err) => console.log(err));
}

// load page

if (zipcode) {
  console.log('loading cards by zip');
  zipRender(zipcode);
  toysByZipcode(zipcode);
} else {
  $('#zipcodeModal').modal('show');
  console.log('loading all cards');
  toysAll();
}


// on load

document.addEventListener('DOMContentLoaded', function(){
  
  // navbar controls

  let navbar = document.getElementById('navbar');
  navbar.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(event.target.id);

    switch (event.target.id){

      case 'zipButton':
        let newZip = document.getElementById('zipInput').value;
        console.log(newZip);
        toysByZipcode(newZip);
        zipRender(newZip);
        localStorage.setItem('zipcode', newZip);
        break;

      case 'zipX':
        zipUnset();
        toysAll();
        break;

      case 'searchButton':
        let searchTerm = document.getElementById('searchInput').value;
        toysBySearch(searchTerm);
        break;

      case 'loginNav':
        $('#loginModal').modal('show');
        break;

      case 'signupNav':
        $('#signUpModal').modal('show');
        break;

      case 'profileButton':
        profileGo();
        break;

      case 'logOut':
        localStorage.removeItem('profile');
        break;

      case 'cartButton':

        break;

      case 'ageSelector':
        
        break;
      
      case 'genderSelector':
        
        break;
    }
  })

  // modal listeners

  document.getElementById('switchToSignUp').addEventListener('click', (event) => {
    $('#loginModal').modal('hide');
    $('#signUpModal').modal('show');
  })

  document.getElementById('switchToLogin').addEventListener('click', (event) => {
    $('#loginModal').modal('show');
    $('#signUpModal').modal('hide');
  })

  // zip modal

  document.getElementById('zipForm').addEventListener('submit', (event) => {
    event.preventDefault();
    let input = document.getElementById('zipcodeInput').value;
    zipRender(input);
    toysByZipcode(input);
    $('#zipcodeModal').modal('hide');
  })

  // log in
  document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('emailInputL').value.split('@').join('%40');
    fetch(`${API_BASE}/profiles?email=${email}`, {
      method: 'GET'
    })
      .then((stream) => stream.json())
      .then((res) => {
        console.log(res);
        localStorage.setItem('profile', res);
        window.location = `/profile/${res}`;
      })
      .catch((err) => console.log(err));
  })

  // sign up
  document.getElementById('signupForm').addEventListener('submit', (event) => {
    
    event.preventDefault();
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInputS').value;
    const phone = document.getElementById('phoneInput').value;
    const zipcode = document.getElementById('zipcodeInput').value;

    const userData = {
      name,
      email,
      phone,
      zipcode,
    };

    fetch(`${API_BASE}/profiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((stream) => stream.json())
      .then((res) => {
        localStorage.setItem('profile', res);
        window.location = `/profile/${res}`;
      })
      .catch((err) => console.log(err));

  });
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

      fetch(`${API_BASE}/profile/${profileID}/favs`, {
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

















