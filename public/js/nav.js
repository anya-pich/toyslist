
const API_BASE = '/api/v1';
let toys = document.getElementById('toys');
let zipcode = localStorage.getItem('zipcode');
let profile = localStorage.getItem('profile');

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

// logged in nav

const loggedIn = () => {
  document.getElementById('signupNav').classList.add('d-none');
  document.getElementById('loginNav').classList.add('d-none');
  document.getElementById('navRight')
    .insertAdjacentHTML('afterbegin', `<a class="nav-link" href="/profile/${profile}" id="profileLink">Profile</a><a class="nav-link" id="logOut">Log Out</a>`)
} 

// go to saved items cart / favorites

const showCart = () => {
  toys.innerHTML = '';
  fetch(`${API_BASE}/profile/${profile}/favs`)
    .then((stream) => stream.json())
    .then(res => renderCart(res))
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

if (profile) {
  loggedIn();
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

      case 'profileLink':
        window.location = event.target.href;
        break;

      case 'logOut':
        localStorage.removeItem('profile');
        location.reload();
        break;

      case 'cartButton':
        console.log('clicked cart button');
        if (profile) {
          showCart();
        } else {
          $('#loginModal').modal('show');
        } 
        break;

      case 'ageSelector':
        
        break;
      
      case 'genderSelector':
        
        break;
    }
  })

  // body controls



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
        localStorage.setItem('profile', res._id);
        console.log(localStorage.getItem('profile'));
        $('#loginModal').modal('hide');
        loggedIn();
      })
      .catch((err) => console.log(err));
  })

  // add item to user cart
  toys.addEventListener('click', (event) => {
    if (event.target.classList.contains('add') && (profile)) {
      console.log('ready to send');
      fetch(`${API_BASE}/profile/${profile}/favs`, {
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
          console.log(res[0].title);
        })
        .catch((err) => console.log(err));
    } else if (event.target.classList.contains('add')) {
      $('#loginModal').modal('show');
    }
  });

  // unfollow item
  toys.addEventListener('click', (event) => {
    if (event.target.classList.contains('unwatchButton')) {
      fetch(`${API_BASE}/profile/${profile}/favs`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({toyId: event.target.id}),
      })
        .then((stream) => stream.json())
        .then((res) => {
          renderCart(res);
        })
        .catch((err) => console.log(err));
      
    } else if (event.target.classList.contains('contactButton')) {
      console.log('foo');
    }
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

// render cart items
const renderCart = (toyObjects) => {
  toys.innerHTML = '';
  toys.insertAdjacentHTML('beforeend', getCartTemplates(toyObjects));
};

const getCartTemplates = (toyObjects) => {
  return toyObjects.reduce((accumulator, toy) => accumulator.concat(
    `<div class="card " style="max-width: 540px;">
      <div class="row no-gutters">
        <div class="col-md-6">
          <img src="${toy.images[0]}" class="card-img pt-2 pl-2" alt="${toy.title}">
        </div>
        <div class="col-md-6">
          <div class="card-body mp-0">
            <dl class="row mt-4 mb-0">
              <dt class="col-sm-5">Price:</dt>
              <dd class="col-sm-7">${toy.price}</dd>
              <dt class="col-sm-5">Ages:</dt>
              <dd class="col-sm-7">${toy.ageTag}</dd>
              <dt class="col-sm-5">Gender:</dt>
              <dd class="col-sm-7">${toy.genderTag}</dd>
              <dt class="col-sm-5">Posted:</dt>
              <dd class="col-sm-7">${(new Date(toy.createdAt)).toDateString()}</dd>
              <dt class="col-sm-6 mt-5"><button type="button" class="btn btn-block btn-outline-secondary contactButton" id="${toy._id}">Contact</button></dt>
              <dd class="col-sm-6 mt-5"><button type="button" class="btn btn-block btn-outline-secondary unwatchButton" id="${toy._id}">Unwatch</button></dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="row no-gutters card-body">
            <h5 class="card-title">${toy.title}</h5>
            <p class="card-text">${toy.description}</p>
      </div>
    </div>`
  ), '');
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














module.exports = {
    index,
    add,
    remove,
};








