'use strict';

/* Search using API */

/* Declare variables */
const apiUrl = 'http://api.tvmaze.com/search/shows?q=';
const input = document.querySelector('.input');
const button = document.querySelector('.btn');
const listResults = document.querySelector('.results');

function searchSeries (){
  //take text value from user
  let userSearch = input.value;
  //reset search each time the users starts a new search
  listResults.innerHTML=('');
  //use the API to get the data specify by user input
  fetch(apiUrl + userSearch)
    .then(response => response.json())
    .then(data => {
      //create a variable to store the data
      // const show = data[0].show;
      //go through the list of elements (loop the array)
      for (let i = 0; i < data.length; i++){
        //store in variables the content of name and image from each show
        const title = data[i].show.name;
        const image = data[i].show.image;

        //If the result has no image, use filler image (AL PARECER FUNCIONA, REVÍSALO AL FINAL)
        if (image === null) {
          const fillerImage = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
          const contentNull = `
          <li class="series__item">
          <h2 class="series__title">${title}</h2>
          <img class="series__image" src="${fillerImage}" alt="${title}">
          </li>`;
          listResults.innerHTML += contentNull;
        } else {
          const imgMedium = data[i].show.image.medium;
          const contentMedium = `
          <li class="news__item">
          <h2 class="news__title">${title}</h2>
          <img class="news__image" src="${imgMedium}" alt="${title}">
          </li>`;
          listResults.innerHTML += contentMedium;
        }
      }
      selectedItem ();
    });
}
button.addEventListener('click', searchSeries);

//create a function to select user favorite items
function userFavs (event) {
  const favItem = event.currentTarget;
  favItem.classList.toggle('favs');
}

function selectedItem () {
  const li = document.querySelectorAll('.news__item');
  for (let i = 0; i <li.length; i++){
    li[i].addEventListener('click', userFavs);
  }
}

//store the information of user favorite items in the localStorage

// const favorites = [];
// const favItem = event.currentTarget;
// favorites.innerHTML = favItem;
// localStorage.setItem('favorites', JSON.stringify('favorites'));
// console.log ('funciona');



