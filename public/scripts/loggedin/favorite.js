const profileId = window.location.pathname.split('/')[2];

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

// Add my profile button
$('.profile').append(`<a href="/../main/${profileId}/profile/${profileId}" class="btn btn-outline-primary btn-rounded btn-md mr-lg-5">my profile</a>`);
