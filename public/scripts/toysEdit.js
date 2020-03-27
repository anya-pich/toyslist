console.log('edit existing toy');
const profileId = window.location.pathname.split('/')[2];
const toyId = window.location.pathname.split('/')[4];
const postForm = document.getElementById('editPost');

// get post
// get specific toy at url/api/v1/profile/profile_id/toy/toy_id
fetch(`/api/v1/profile/${profileId}/toy/${toyId}`)
    .then((stream) => stream.json())
    .then(res => updateForm(res))
    .catch((err) => console.log(err));

// populate data into form
function updateForm(existing) {
    document.getElementById('inputTitle').value = existing.title;
    document.getElementById('inputDescription').value = existing.description;
    document.getElementById('priceInput').value = existing.price;
    document.getElementById('ageTagInput').value = existing.ageTag;
    document.getElementById('genderTagInput').value = existing.genderTag;
    document.getElementById('imgInput').value = existing.images;
};

postForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(postForm);

    const title = document.getElementById('inputTitle').value;
    const description = document.getElementById('inputDescription').value;
    const price = document.getElementById('priceInput').value;
    const ageTag = document.getElementById('ageTagInput').value;
    const genderTag = document.getElementById('genderTagInput').value;
    const images = [document.getElementById('imgInput').value];

    const updatedPost = {
        title,
        description,
        price,
        ageTag,
        genderTag,
        images
    };
    // console.log(newPost);

    fetch(`/api/v1/profile/${profileId}/toy/${toyId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(updatedPost),
    })
        .then((stream) => stream.json())
        .then((res) => {
            console.log(res);
            
            window.location = `/profile/${profileId}`;
            
          })
        .catch((err) => console.log(err));
});
