
const API_BASE = '/api/v1';
const toys = document.getElementById('toys');


// GET ALL USERS
fetch(`${API_BASE}/profiles`)
  .then((stream) => stream.json())
  .then(res => render(res))
  .catch((err) => console.log(err));

  // get all toys from a zip code
// fetch(`${API_BASE}/profiles?zipcode=${userZipcode}`)
//   .then((stream) => stream.json())
//   .then(res => render(res))
//   .catch((err) => console.log(err));

// TEMP API CALL
// render(TEMP_CITIES);

// render toys to html
function render(profilesArr) {
  // console.log('got profiles', profilesArr);
  const toyTemplates = profilesArr.map((profile) => getToyTemplates(profile)).join('');
  // console.log('got templates', toyTemplates);
  toys.insertAdjacentHTML('beforeend', toyTemplates);
};

// get concatenated toy templates for each profile
function getToyTemplates(profile) {
  return profile.toys.reduce((accumulator, toy) => accumulator.concat(
    `<div class="col-md-3 mb-4">
      <div id="${toy._id}" class="card" style="height:450px;">
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



