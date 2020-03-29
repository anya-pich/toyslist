
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
      <h5 class="text-center">Please login to enjoy the feature!</h5>
      </div>
      <div class="modal-footer">
        <form class="form-inline md-form ml-auto mb-1">
          
            <button type="button" class="nav-link btn btn-primary mr-2" data-toggle="modal" data-target="#signUpModal" id="jumpToSignUp">Sign up</a>
          
            <button type="button" class="nav-link btn btn-primary mr-2" data-toggle="modal" data-target="#loginModal" id="jumpToLogin">Login</a>
          
        </form>
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

// log in and go to main page
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('emailInputL').value.split('@').join('%40');
  console.log(email);
  fetch(`/api/v1/profiles?email=${email}`, {
    method: 'GET'
  })
    .then((stream) => stream.json())
    .then((res) => {
      console.log(res);
      window.location = `/main/${res}`;
    })
    .catch((err) => console.log(err));
})


// sign up and go to ???

const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('nameInput').value;
  const email = document.getElementById('emailInputS').value;
  const phone = document.getElementById('phoneInput').value;
  const zipcode = document.getElementById('zipcodeInput').value;

  const userDataS = {
    name,
    email,
    phone,
    zipcode,
  };

  fetch(`/api/v1/profiles?email=${email}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((stream) => stream.json())
    .then((res) => {
      if (res.status === 201) {
        window.location = '/login';
      } else {
      window.location = `/profile/${res}`;      }
    })
    .catch((err) => console.log(err));
})



$(document).on("click","#switchToSignUp",function(){
  $('#loginModal').modal('hide');
  $('#signUpModal').modal('show');
});

$(document).on("click","#switchToLogin",function(){
  $('#signUpModal').modal('hide');
  $('#loginModal').modal('show');
});

$(document).on("click","#jumpToSignUp",function(){
  $('#exampleModal').modal('hide');
  $('#signUpModal').modal('show');
});

$(document).on("click","#jumpToLogin",function(){
  $('#exampleModal').modal('hide');
  $('#loginModal').modal('show');
});
