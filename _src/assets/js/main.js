'use strict';

/* Declare variables */
const apiUrl = 'http://api.tvmaze.com/search/shows?q=';
const input = document.querySelector('.input');
const button = document.querySelector('.btn');
const listResults = document.querySelector('.results');
const searchMsg = document.querySelector('.results__msg');

/* Search using API */
function searchSeries (){
  //take text value from user
  let userSearch = input.value;
  //reset search each time the users starts a new search
  listResults.innerHTML=('');
  //use the API to get the data specify by user
  fetch(apiUrl + userSearch)
    .then(response => response.json())
    .then(data => {
      searchMsg.innerHTML = data.length;
      //go through the list of elements (loop the array)
      for (let i = 0; i < data.length; i++){
        //store in variables the content (name and image) from each show
        const title = data[i].show.name;
        const image = data[i].show.image;
        const genres = data[i].show.genres;
        let contentGenres = "";

        for (let j = 0; j < genres.length; j++) {
          contentGenres += genres[j]+ ', ';

        }
        console.log(contentGenres);

        //if the result has no image, use filler image
        if (image === null) {
          const fillerImage = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
          const contentNull = `
          <li class="series__item" id="${title}">
          <img class="series__image" src="${fillerImage}" alt="${title}">
          <h2 class="series__title">${title}</h2>
          <p class="series__genre">${contentGenres}</p>
          </li>`;
          listResults.innerHTML += contentNull;
        } else {
          const imgMedium = data[i].show.image.medium;
          const contentMedium = `
          <li class="series__item" id="${title}">
          <img class="series__image" src="${imgMedium}" alt="${title}">
          <h2 class="series__title">${title}</h2>
          <p class="series__genre">${contentGenres}</p>
          </li>`;
          listResults.innerHTML += contentMedium;
        }
      }
      selectedItem ();
    });
}
button.addEventListener('click', searchSeries);

/* Create a function to select user favorite items (series) */
function userFavs (event) {
  const favItem = event.currentTarget;
  favItem.classList.toggle('favs');
}

//When the user clicks an item, the item is highlighted and vice versa
function selectedItem () {
  const item = document.querySelectorAll('.series__item');
  for (let i = 0; i <item.length; i++){
    item[i].addEventListener('click', userFavs);
  }
}

function hideResults () {
  listResults.classList.toggle('hidden');
}

searchMsg.addEventListener('click', hideResults);
