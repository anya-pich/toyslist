
const API_BASE = '/api/v1';
const toy = document.getElementById('toy');
const [,,profileId,,toyId] = window.location.pathname.split('/');

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
      <button class="btn btn-secondary" type="submit">Add to My Favorite</button>
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Seller's Contact</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <dl class="row">
        <dt class="col-sm-3">Name:</dt>
        <dd class="col-sm-9">${toy.name}</dd>
        <dt class="col-sm-3">Email:</dt>
        <dd class="col-sm-9">${toy.ageTag}</dd>
        <dt class="col-sm-3">Phone:</dt>
        <dd class="col-sm-9">${toy.genderTag}</dd>
        <dt class="col-sm-3">Zipcode:</dt>
        <dd class="col-sm-9">${date.toDateString()}</dd>
      </dl>
      </div>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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

