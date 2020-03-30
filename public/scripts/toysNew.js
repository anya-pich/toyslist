console.log('post new toy');
const profileId = window.location.pathname.split('/')[2];
const postForm = document.getElementById('newPost');
// console.log('toy ID = ', toyId);

// Add favorite button
$('.favorite').append(
`<a href="/main/${profileId}/favorite">
  <svg class="bi bi-heart-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" clip-rule="evenodd"/>
  </svg>
</a>`
);

// Listen/Handle New Post Submit
postForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(postForm);

    const title = document.getElementById('inputTitle').value;
    const description = document.getElementById('inputDescription').value;
    const price = document.getElementById('priceInput').value;
    const ageTag = document.getElementById('ageTagInput').value;
    const genderTag = document.getElementById('genderTagInput').value;
    const images = [document.getElementById('imgInput').value];

    const newPost = {
        title,
        description,
        price,
        ageTag,
        genderTag,
        images
    };
    // console.log(newPost);

    // window.location = `/profile/${profileId}`;

    fetch(`/api/v1/profile/${profileId}/toys`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(newPost),
    })
        .then((stream) => stream.json())
        .then((res) => {
            console.log(res);
            
            window.location = `/main/${profileId}/profile/${profileId}`;
            
          })
        .catch((err) => console.log(err));
});

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


