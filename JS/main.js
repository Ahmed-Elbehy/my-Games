


// * start handel navbar click
let navBtn = document.querySelectorAll(".nav-link");
// console.log(navBtn);
navBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        navBtn.forEach((btn) => {
            btn.classList.remove("active");
        });

        e.target.classList.add("active");
        // console.log(e.target.innerText);
        gamesByCategory(e.target.innerText);
        
    });
});

// * end handel navbar click





//& start get data games List
// getGamesList()
async function getGamesList() {

    const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'bfd7bd8704msh0587e561187321dp1c8f55jsn440963521289',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json()
;
for(let tem of result){
    // console.log(tem.genre);
}
        // console.log(result[400]);
    } catch (error) {
        console.error(error);
    }
    
} ;
//&end get data games List















//! start get data games by category
gamesByCategory();
async function gamesByCategory(category){
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?&category=${category ? category : `MMORPG`}`;
    const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'bfd7bd8704msh0587e561187321dp1c8f55jsn440963521289',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        for(const itm of result){
            // console.log(itm.id);
            showCrads(result)
        }
        // console.log(result);
    } catch (error) {
        console.error(error);
    } 
}
// ! end get data games by category

// ^  start gameDetails
// gameDetails()
async function gameDetails(id=540){
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': ' bfd7bd8704msh0587e561187321dp1c8f55jsn440963521289',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log(id);
        // console.log(result);
        
        showDetails(result);
    } catch (error) {
        console.error(error);
    }
}

// ^ end gameDetails

// ~ start show cars
const cardsContent = document.getElementById("card-content")
async function showCrads(result){
    let content = ''
    for(const item of result){
        let img = item.thumbnail;
        content += `
            <!-- start card -->
            <div class="flip flip-vertical col-sm-12 col-md-6 col-lg-4 me-3">
                <div class="front" style="background-image: url(${img})">
                    <h1 class="text-shadow">${item.title}</hi>
                </div>
                <div class="back">
                    <h2 class="title">${item.title}</h2>
                    <div class="d-flex justify-content-center">
                        <h4 class="text-light  bg-primary w-50">free</h4>
                    </div>
                    <p>${item.short_description}</p>
                    <a class="btn bg-primary" href="#popup"  onclick="gameDetails(${item.id})">show Details</a>
                    <div class="btn-box d-flex justify-content-between align-items-center">
                        <h6 class="mt-3">${item.genre}</h6>
                        <h6 class="mt-3">${item.platform}</h6>
                    </div>
                </div>
            </div>
            <!-- end card -->
        `
    }
    cardsContent.innerHTML = content
}

// ~ end show cars
// ^strt show details
// 
// showDetails()
let popup = document.getElementById("popup");

async function showDetails(data){
    let image = data.thumbnail;
    cardsContent.classList.add("d-none");
    popup.classList.remove("d-none");

    // console.log(data.title);
    let content = `
        <div class="popup-inner">
            <div class="popup__photo d-flex   justify-content-center">
                <img src="${image}" class=" image-details w-25 me-3 mb-2" alt="">
                <div class="d-flex flex-column align-items-center"">
                    <h2 class=" text-light bg-black  align-self-start my-3">Title:<span>${data.title}</span></h2>
                    <h5 class=" text-light bg-black  align-self-start my-3">Category: <span class="bg-primary rounded-3 py-1 px-2">${data.genre}</span></h5>
                    <h5 class=" text-light bg-black  align-self-start my-3">Platform: <span class="bg-primary rounded-3 p-y-1 px-2">${data.platform}</span></h5>
                    <h5 class=" text-light bg-black  align-self-start my-3">status: <span class="bg-primary rounded-3 p-y-1 px-2">${data.status}</span></h5>
                </div>
            </div>
            <div class="popup__text">
            <p class="text-light">${data.description}</p>
            </div>
            <a class="popup__close" href="#" onclick="returnDataAgain()">
                <i class="fa-solid fa-circle-xmark"></i>
            </a>
            <div>
                <a  class="btn bg-body text-info-emphasis fs-4">show Games</a>
            </div>
        </div>
    </div>
    `
    popup.innerHTML = content
    
}

// closs popup and return data  again
function returnDataAgain(){
    cardsContent.classList.remove("d-none");
    popup.classList.add("d-none");
}

// ^end show details