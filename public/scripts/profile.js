console.log('Profile show JS');
const API_BASE = '/api/v1';
const profile = document.getElementById('profile');
const profileId = window.location.pathname.split('/')[2];
console.log('profile Id = ', profileId);

// get profile info from api
function buildProfile() {
    fetch(`${API_BASE}/profile/${profileId}`)
    .then((stream) => stream.json())
    .then(res => render(res))
    .catch((err) => console.log(err));
}
buildProfile();

// render profile info
function render(profileObj) {
    console.log(profileObj);
    const profileTemplate = getProfileTemplate(profileObj);
    profile.innerHTML = profileTemplate;
}

// render profile template
function getProfileTemplate(profile) {
    const toys = profile.toys;
    console.log(toys);
    return `
        <div id="${profile._id}" class="col-md-8 offset-md-2">
        <div class="clearfix">
            <img src="${profile.pic}" class="img-thumbnail rounded-circle mb-3 w-25 float-right">
            <dl class="row">
                <h2 class="m-2">${profile.name}</h2>
            </dl>
            <dl class="row">
                <dt class="col-sm-3">Email:</dt>
                <dd class="col-sm-9">${profile.email}</dd>
                <dt class="col-sm-3">Tel:</dt>
                <dd class="col-sm-9">${profile.phone}</dd>
                <dt class="col-sm-3">Zipcode:</dt>
                <dd class="col-sm-9">${profile.zipcode}</dd>
            </dl>
        </div>
        <a href="/profile/${profileId}/edit" class="btn btn-info float-right" type="button">Edit Profile</a>
        <hr class="m-2 mb-5 mt-5">
        <section>
            <a href="/profile/${profile._id}/toys/new" class="btn btn-primary float-right mb-3">
                New post
            </a>
            <h4 class="m-2 mb-5">${toys.length ? 'Posts:' : ''}</h4>
            ${getToyTemplates(toys)}
        </section>
        </div>
    `;
};

// render toy card templates
function getToyTemplates(toys) {
    return toys.map((toy) => {
        return `
          <article id="${toy._id}" class="card mb-4">
            <div class="card-body">
                <img src="${toy.images[1]}" class="img-fluid mb-3" width="100%" />
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
                    <dd class="col-sm-9">${new Date(toy.createdAt).toDateString()}</dd>
                </dl>
                <hr class="m-2 mb-3">
              <a href="/profile/${profileId}/toy/${toy._id}/edit" class="btn btn-info" type="button">Edit Post</a>
              <button id="deleteBtn" class="btn btn-danger delete-post mr-2" type="button">Delete Post</button>
            </div>
          </article>
        `;
    }).join('');
};

// delete toy post
profile.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-post')) {
        deletePost(event);
    }
});

function deletePost(event) {

    const toyId = event.target.parentNode.parentNode.id;
    console.log('deleting ', toyId);
    fetch(`${API_BASE}/profile/${profileId}/toy/${toyId}`, {
        method: 'DELETE',
      })
        .then((stream) => stream.json())
        .then((res) => {
          console.log(res);
          buildProfile();
        })
        .catch((err) => console.log(err));

} //works

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
      window.location = `/main/${profileId}`;
    })
    .catch((err) => console.log(err));
})



