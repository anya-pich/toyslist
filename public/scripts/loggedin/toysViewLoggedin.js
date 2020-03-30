
const API_BASE = '/api/v1';
const toy = document.getElementById('toy');
const [,,hostId,,profileId,,toyId] = window.location.pathname.split('/');

// GET toy
function getToy() {
  fetch(`${API_BASE}/profile/${profileId}/toy/${toyId}`)
    .then((stream) => stream.json())
    .then(res => render(res))
    .catch((err) => console.log(err));
}

getToy();

// Add my profile button
$('.profile').append(`<a href="../../../profile/${hostId}" class="btn btn-outline-primary btn-rounded btn-md mr-lg-5">my profile</a>`);

// Add favorite button
$('.favorite').append(
`<a href="/main/${hostId}/favorite">
  <svg class="bi bi-heart-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" clip-rule="evenodd"/>
  </svg>
</a>`
);

function render(toyObj) {
  const toyTemplate = getToyTemplate(toyObj);
  toy.innerHTML = '';
  toy.insertAdjacentHTML('beforeend', toyTemplate);
}

function getToyTemplate(toy) {
  const date = new Date(toy.createdAt);
  return `
    <div id="${toy._id}" class="col-md-8 offset-md-2 shadow p-3 mb-5 bg-white rounded">
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
        <dd class="col-sm-9">${toy.title}</dd>
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
      window.location = `/main/${hostId}`;
    })
    .catch((err) => console.log(err));
})

