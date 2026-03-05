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
// async function getGamesList() {
//   const url = "https://free-to-play-games-database.p.rapidapi.com/api/games";
//   const options = {
//     method: "GET",
//     headers: {
//       "x-rapidapi-key": "bfd7bd8704msh0587e561187321dp1c8f55jsn440963521289",
//       "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
//     },
//   };

//   try {
//     const response = await fetch(url, options);
//     const result = await response.json();
//     // console.log(result[400]);
//   } catch (error) {
//     console.error(error);
//   }
// }
//&end get data games List

//! start get data games by category
gamesByCategory();
async function gamesByCategory(category) {
  const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?&category=${category ? category : `MMORPG`}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "bfd7bd8704msh0587e561187321dp1c8f55jsn440963521289",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();

    showCrads(result);
  } catch (error) {
    console.error(error);
  }
}
// ! end get data games by category

// ~ start show cars
const cardsContent = document.getElementById("card-content");
async function showCrads(result) {
  let content = "";
  for (const item of result) {
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
                    <a class="btn bg-primary" href="#popup"  onclick="gameGetDetails(${item.id})">show Details</a>
                    <div class="btn-box d-flex justify-content-between align-items-center">
                        <h6 class="mt-3">${item.genre}</h6>
                        <h6 class="mt-3">${item.platform}</h6>
                    </div>
                </div>
            </div>
            <!-- end card -->
        `;
  }
  cardsContent.innerHTML = content;
}
// ~ end show cars

// ^  start gameGetDetails
// gameGetDetails()
async function gameGetDetails(id = 540) {
  const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": " bfd7bd8704msh0587e561187321dp1c8f55jsn440963521289",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    showDetails(result);
  } catch (error) {
    console.error(error);
  };
};

// ^ end gameGetDetails

// ^strt show details
// showDetails()
let popup = document.getElementById("popup");
async function showDetails(data) {
  let image = data.thumbnail;
  cardsContent.classList.add("d-none");
  // document.body.style.overflow = "hidden";
  popup.style.display = "flex";

  // console.log(data.title);
  let content = `

    <div class="details">
        
        <button class="btn-close text-white mt-3" onclick="returnDataAgain()"></button>
      
        <div class="row pt-4">
            <div class="image-pox col-sm-12 col-md-6 d-md-flex justify-content-end">
                <img src="${image}" alt="">
            </div>
            <div class="game-data col-sm-12 col-md-6 d-md-flex flex-column align-items-start pt-4">
                <h2 class="text-light my-3">Title:<span class="px-3">${data.title}</span></h2>
                <h5 class="text-light my-3">Category: <span class="bg-primary rounded-3 py-1 p-2">${data.genre}</span></h5>
                <h5 class="text-light my-3">Platform: <span class="bg-primary rounded-3 py-1 px-2">${data.platform}</span></h5>
                <h5 class="text-light my-3">status: <span class="bg-primary rounded-3   py-1 px-2">${data.status}</span></h5>
            </div>
            <div class="ditails-data">
                <h5 class="mt-3 p-4 text-start">
                ${data.description}
                </h5>
            </div>
        </div>
    </div>
    `;
  popup.innerHTML = content;
}
// closs popup and return data  again
function returnDataAgain() {
  popup.style.display = "none";
  cardsContent.classList.remove("d-none");
};

// ^end show details
