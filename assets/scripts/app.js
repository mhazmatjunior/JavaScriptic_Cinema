const addMovieBtn = document.querySelector("header button");
const popUpMenu = document.querySelector("#add-modal");
const backdrop = document.getElementById("backdrop");
const cancelBtn = popUpMenu.querySelector(".btn--passive");
const confirmAddMovieBtn = cancelBtn.nextElementSibling;
const userInputs = popUpMenu.querySelectorAll("input");
const section = document.querySelector("section");
const ul = document.querySelector("ul");
const cancelPopUp = document.querySelector("#delete-modal");
const movies = [];

function showBackdrop() {
  backdrop.classList.remove("visible");
  popUpMenu.classList.remove("visible");
  cancelPopUp.classList.remove("visible");
  clearUserInputs();
}
function removePopUpMenu() {
  popUpMenu.classList.remove("visible");
}

function popUpStarter() {
  popUpMenu.classList.toggle("visible");
  backdrop.classList.toggle("visible");
  clearUserInputs();
}

function updateUI() {
  if (movies.length === 0) {
    section.style.display = "block";
  } else {
    section.style.display = "none";
  }
}

function deleteMovieElement(index) {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === index) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  ul.children[movieIndex].remove();
  showBackdrop();
  updateUI();
}

function deleteMovieHandler(index) {
  let btns = document.querySelectorAll("button");
  cancelPopUp.classList.add("visible");
  backdrop.classList.add("visible");
  btns[3].replaceWith(btns[3].cloneNode(true));
  btns = document.querySelectorAll("button");
  btns[2].removeEventListener("click", showBackdrop);
  btns[2].addEventListener("click", showBackdrop);
  btns[3].addEventListener("click", deleteMovieElement.bind(null, index));
}

function addMovieElement(id, title, image, rating) {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
   <div class="movie-element__image">
      <img src="${image}" alt="${title}"> 
   </div>
   <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
   </div>
   `;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
  ul.append(newMovieElement);
}

function clearUserInputs() {
  for (const userInput of userInputs) {
    userInput.value = "";
  }
}
function confirmAddMovieHandler() {
  const movieTitle = userInputs[0].value;
  const movieImgUrl = userInputs[1].value;
  const movieRating = userInputs[2].value;
  if (
    !movieTitle.trim() ||
    !movieImgUrl.trim() ||
    !movieRating.trim() ||
    +movieRating > 5 ||
    +movieRating < 1
  ) {
    alert("Enter Valid Inputs (Rating Between 1 and 5)");
    return;
  }
  const newMovie = {
    title: movieTitle,
    image: movieImgUrl,
    rating: movieRating,
    id: Math.random().toString(),
  };
  movies.push(newMovie);
  console.log(movies);
  popUpStarter();
  updateUI();
  addMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
}

addMovieBtn.addEventListener("click", popUpStarter);
cancelBtn.addEventListener("click", popUpStarter);
backdrop.addEventListener("click", showBackdrop);
confirmAddMovieBtn.addEventListener("click", confirmAddMovieHandler);
