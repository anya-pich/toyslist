console.log('post new toy');
const profileId = window.location.pathname.split('/')[2];
const postForm = document.getElementById('newPost');
// console.log('toy ID = ', toyId);

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
            
            window.location = `/profile/${profileId}`;
            
          })
        .catch((err) => console.log(err));
});
