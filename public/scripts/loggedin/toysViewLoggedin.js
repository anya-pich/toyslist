
const API_BASE = '/api/v1';
const toy = document.getElementById('toy');
const toyId = window.location.pathname.split('/')[2];

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