
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
  const toyTemplate = getToyTemplate(toyObj);
  toy.innerHTML = '';
  toy.insertAdjacentHTML('beforeend', toyTemplate);
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
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      Contact the seller
      </button>
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Add to My Favorite</button>
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <h5 class="text-center">Please login to see the seller contact!</h5>
      </div>
      <div class="modal-footer">
        <a href='/signup' class="btn btn-primary">Signup</a>
        <a href='/login' class="btn btn-primary">Login</a>
      </div>
    </div>
  </div>
</div>
  `;
}

var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

      // <section>
      //   <h4 class="mb-4">${toy.posts.length ? 'Posts:' : ''}</h4>
      //   ${getPostTemplates(toy.posts)}
      // </section>