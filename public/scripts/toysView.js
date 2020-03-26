
const API_BASE = '/api/v1';
const toy = document.getElementById('toy');
// const toyId = window.location.pathname.split('/')[2];
const [,,profileId,,toyId] = window.location.pathname.split('/');

// const TEMP_TOY = {
//   "images": [
//       "https://images.unsplash.com/photo-1520627977056-c307aeb9a625?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=150"
//   ],
//   "_id": "5e7cf006925fa426bdcba947",
//   "title": "so many lego people",
//   "description": "Elit est dolor ad laborum ipsum cupidatat ad laboris magna Lorem amet dolor in nostrud.",
//   "price": "$15.00",
//   "ageTag": "5+",
//   "genderTag": "all",
//   "createdAt": "2020-03-26T18:10:14.305Z",
//   "updatedAt": "2020-03-26T18:10:14.305Z"
// };

// GET toy
function getToy() {
  fetch(`${API_BASE}/profile/${profileId}/toy/${toyId}`)
    .then((stream) => stream.json())
    .then(res => render(res))
    .catch((err) => console.log(err));
}

getToy();

$('.profile').append(`<a href="/profile">my profile</a>`);

function render(toyObj) {
  console.log(toyObj);
  const toyTemplate = getToyTemplate(toyObj);
  toy.innerHTML = '';
  toy.insertAdjacentHTML('beforeend', toyTemplate);
  console.log(toy);
}

function getToyTemplate(toy) {
  const date = new Date(toy.createdAt);
  return `
    <div id="${toy._id}" class="col-md-8 offset-md-2">
      <img src="${toy.images[0]}" class="img-fluid mb-3" width="100%" />
      <h2>${toy.title}</h2>
      <p class="mb-5">${toy.description}</p>
      <dl class="row">
        <dt class="col-sm-3">Price:</dt>
        <dd class="col-sm-9">${toy.price}</dd>
        <dt class="col-sm-3">Ages:</dt>
        <dd class="col-sm-9">${toy.ageTag}</dd>
        <dt class="col-sm-3">Gender:</dt>
        <dd class="col-sm-9">${toy.genderTag}</dd>
        <dt class="col-sm-3">Posted:</dt>
        <dd class="col-sm-9">${date.toDateString()}</dd>
      </dl>
      <a class="btn btn-primary" href="/profile/${profileId}" role="button">Contact seller</a>
      <button class="btn btn-secondary" type="submit">Add to cart</button>
    </div>
  `;
}

      // <section>
      //   <h4 class="mb-4">${toy.posts.length ? 'Posts:' : ''}</h4>
      //   ${getPostTemplates(toy.posts)}
      // </section>