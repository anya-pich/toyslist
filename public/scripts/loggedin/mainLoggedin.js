const API_BASE = '/api/v1';
const toys = document.getElementById('toys');
const profileId = window.location.pathname.split('/')[2];


// GET ALL USERS
fetch(`${API_BASE}/profiles`)
  .then((stream) => stream.json())
  .then(res => render(res))
  .catch((err) => console.log(err));

// get zipcode cookie
function getCookie2(cooKey) {
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
const setZip2 = (zipcode) => {
  document.getElementById('zipInput2').setAttribute('value', zipcode);
  document.getElementById('zipButton2').innerText = 'Clear';
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
      <div class="card-body clearfix">
        <h5 class="card-title">${toy.title}</h5>
        <p class="card-text text-truncate">${toy.description}</p>
        <h6 class="card-subtitle text-muted">${toy.price}</h6>
      </div>
      <div>
        <a href="/toysLoggedin/${profile._id}/toy/${toy._id}" class="btn btn-primary mr-4 mb-3 float-right">View</a>
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
  const zipcode = getCookie2('zipcode');
  if (zipcode) {
    setZip2(zipcode);
    fetch(`${API_BASE}/profiles?zipcode=${zipcode}`)
      .then((stream) => stream.json())
      .then(res => render(res))
      .catch((err) => console.log(err));
  } else {
    $('#zipcodeModal2').modal('show');
    fetch(`${API_BASE}/profiles`)
      .then((stream) => stream.json())
      .then(res => render(res))
      .catch((err) => console.log(err));
  }
});


//home button

const homebtn = document.getElementById('homebtn');
homebtn.addEventListener('click', (event) => {
  event.preventDefault();
  fetch(`/api/v1/profile/${profileId}`, {
    method: 'GET'
  })
    .then((stream) => stream.json())
    .then((res) => {
      console.log(res);
      window.location = `/main/${profileId}`;
    })
    .catch((err) => console.log(err));
})