const API_BASE = '/api/v1';
const toys = document.getElementById('toys');


// GET ALL USERS
fetch(`${API_BASE}/profiles`)
  .then((stream) => stream.json())
  .then(res => render(res))
  .catch((err) => console.log(err));

// TEMP API CALL
// render(TEMP_CITIES);
  // $(.profile).append(`<a href="/profile">my profile</a>`)

function render(profilesArr) {
  const toyTemplates = profilesArr.map((profile) => getToyTemplates(profile)).join('');
  toys.insertAdjacentHTML('beforeend', toyTemplates);
};

function getToyTemplates(profile) {
  return profile.toys.reduce((accumulator, toy) => accumulator.concat(
  `<div class="col-md-3 mb-4">
    <div id="${toy._id}" class="card h-100">
      <img src="${toy.images[0]}" class="card-img-top" alt="${toy.title}" />
      <div class="card-body">
        <h5 class="card-title">${toy.title}</h5>
        <p class="card-text text-truncate">${toy.description}</p>
        <h6 class="card-subtitle mb-2 text-muted">${toy.price}</h6>
        <a href="profile/${profile._id}/toy/${toy._id}" class="btn btn-primary float-right">View</a>
      </div>
      <div class="card-footer text-center">
        <small class="text-muted">Posted by ${profile.name}</small>
      </div>
    </div>
  </div>`
  ), '');
};
