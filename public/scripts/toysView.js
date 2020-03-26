
const API_BASE = '/api/v1';
const toy = document.getElementById('toy');
const toyId = window.location.pathname.split('/')[2];

const TEMP_TOY = {
  "images": [
      "https://images.unsplash.com/photo-1520627977056-c307aeb9a625?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=150"
  ],
  "_id": "5e7cf006925fa426bdcba947",
  "title": "so many lego people",
  "description": "Elit est dolor ad laborum ipsum cupidatat ad laboris magna Lorem amet dolor in nostrud.",
  "price": "$15.00",
  "ageTag": "5+",
  "genderTag": "all",
  "createdAt": "2020-03-26T18:10:14.305Z",
  "updatedAt": "2020-03-26T18:10:14.305Z"
};

// GET toy
function getToy() {
  fetch(`${API_BASE}/profiles`)
    .then((stream) => stream.json())
    .then(res => render(res))
    .catch((err) => console.log(err));
}

getToy();

$('.profile').append(`<a href="/profile">my profile</a>`);

function render(toyObj) {
  const toyTemplate = getToyTemplate(toyObj);
  toy.innerHTML = '';
  toy.insertAdjacentHTML('beforeend', toyTemplate);
  console.log(toy);
}

function getToyTemplate(json) {
  // toy Template
  // TODO: Update Add Post Link
  return `
    <div id="${json.toys._id}" class="col-md-8 offset-md-2">
      <img src="${json.toys.images}" class="img-fluid mb-3" width="100%" />
      <h2>${json.toys.title}</h2>
      <p class="mb-5">${json.toys.description}</p>
    </div>
  `;
}

      // <section>
      //   <h4 class="mb-4">${toy.posts.length ? 'Posts:' : ''}</h4>
      //   ${getPostTemplates(toy.posts)}
      // </section>