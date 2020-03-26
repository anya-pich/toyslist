const API_BASE = '/api/v1';
const toys = document.getElementById('toys');


// GET ALL USERS
fetch(`${API_BASE}/profiles`)
  .then((stream) => stream.json())
  .then(res => render(res))
  .catch((err) => console.log(err));

// TEMP API CALL
// render(TEMP_CITIES);

function render(toysArray) {
  const toyTemplates = toysArray.map((toy) => getToyTemplate(toy)).join('');
  toys.insertAdjacentHTML('beforeend', toyTemplates);
}

function getToyTemplate(json) {
// for(let i in user.toys) {
// 	console.log(i);

// for(let i=0; i<toysAll.length; i++) {
  return `
    <div class="col-md-4 mb-4">
      <div id="${json.toys[0]._id}" class="card">
        <img src="${json.toys[0].images}" class="card-img-top" alt="${json.toys[0].title}" />
        <div class="card-body">
          <h5>${json.toys[0].title}</h5>
          <p class="card-text">${json.toys[0].description}</p>
          <a href="/toysLoggedin/${json.toys[0]._id}" class="btn btn-primary float-right">View</a>
        </div>
      </div>
    </div>
  `;
};