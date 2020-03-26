
// const $toysList = $('#toys');
// const allToys = [];

// $.ajax ({
// 	method: 'GET',
// 	url:'/api/v1/profiles',
// 	success: onSuccess,
// 	error: onError,
// 	});

// 	function getToyHtml(json) {
// 		console.log("get a toy");
// 		return `
// 		    <div class="col-md-4 mb-4">
// 	      		<div id="${json.toys[0]._id}" class="card">
// 	        		<img src="${json.toys[0].images}" class="card-img-top" alt="${json.toys[0].title}" />
// 	        		<div class="card-body">
// 	          			<h5>${json.toys[0].title}</h5>
// 	          			<p class="card-text">${json.toys[0].description}</p>
// 	          			<a href="/profiles/${json.toys[0]._id}" class="btn btn-primary float-right">View</a>
// 	        		</div>
// 	      		</div>
// 	    	</div>
// 	  	`;
// 	};

// 	function getAllToysHtml(toys) {
// 		return toys.map(getToyHtml).join('');
// 	};

// 	function render () {
// 		$toysList.empty();
// 		let toysHtml = getAllToysHtml(allToys);
// 		$toysList.append(toysHtml);
// 	};

// 	function onSuccess (json) {
// 		console.log("ok");
// 		allToys = json;
// 		render();
// 	};


// 	function onError(json) {
// 		console.log("Error");
// 	};

//////////////////////////////////////////////


const API_BASE = '/api/v1';
const toys = document.getElementById('toys');


// GET ALL USERS
fetch(`${API_BASE}/profiles`)
  .then((stream) => stream.json())
  .then(res => render(res))
  .catch((err) => console.log(err));

// TEMP API CALL
// render(TEMP_CITIES);

function render(toysArray) {
  const toyTemplates = toysArray.map((toy) => getToyTemplate(toy)).join('');
  toys.insertAdjacentHTML('beforeend', toyTemplates);
}

function getToyTemplate(json) {
// for(let i in user.toys) {
// 	console.log(i);
let toysAll = [];
console.log(json.toys);
for (let i=0;i<json.length;i++){
toysAll.push(json[i].toys);
console.log(toysAll);};
// for(let i=0; i<toysAll.length; i++) {
  return `
    <div class="col-md-4 mb-4">
      <div id="${json.toys[0]._id}" class="card">
        <img src="${json.toys[0].images}" class="card-img-top" alt="${json.toys[0].title}" />
        <div class="card-body">
          <h5>${json.toys[0].title}</h5>
          <p class="card-text">${json.toys[0].description}</p>
          <a href="/toys/${json.toys[0]._id}" class="btn btn-primary float-right">View</a>
        </div>
      </div>
    </div>
  `;
};
// }



//////////////////////////////////////////////
// $('form-inline').on('submit',function(e){
// 	e.preventDefault();
// 	$.ajax ({
// 		method: 'GET',
// 		url:'http://api/v1/profile'
// 		success: onSuccess,
// 		error: onError,
// 	});

// 	function onSuccess (json) {
// 	$users.empty();
// 		for (let i=0; i<json.fakePeople.length; i++) {
// 			$users.append('json.fakePeople.name');
// 	};
// function onError () {
// 	console.log('err');
// 	};
// };
// });









