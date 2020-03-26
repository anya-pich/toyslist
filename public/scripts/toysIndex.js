const API_BASE = '/api/v1';
const toys = document.getElementById('toys');

// get all toys from all profiles
fetch(`${API_BASE}/profiles`)
  .then((stream) => stream.json())
  .then(res => render(res))
  .catch((err) => console.log(err));

// get all toys from a zip code
// fetch(`${API_BASE}/profiles?zipcode=${userZipcode}`)
//   .then((stream) => stream.json())
//   .then(res => render(res))
//   .catch((err) => console.log(err));

// render toys to html
function render(profilesArr) {
  console.log('got profiles', profilesArr);
  const toysArr = profilesArr.reduce(
    (toysArr, profile) => toysArr.concat(profile.toys), []
  );
  console.log('rendering toys', toysArr);
  const toyTemplates = toysArr.reduce((htmlStr, toy) => htmlStr.concat(
    `<div class="col-md-4 mb-4">
    <div id="${toy._id}" class="card">
      <img src="${toy.images[0]}" class="card-img-top" alt="${toy.title}" />
      <div class="card-body">
        <h5>${toy.title}</h5>
        <p class="card-text">${toy.description}</p>
        <a href="/toys/${toy._id}" class="btn btn-primary float-right">View</a>
      </div>
    </div>
  </div>`
  ), '');
  toys.insertAdjacentHTML('beforeend', toyTemplates);
};






