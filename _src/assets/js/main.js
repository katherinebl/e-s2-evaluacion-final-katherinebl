'use strict';

/* Declare variables */
const apiUrl = 'http://api.tvmaze.com/search/shows?q=';
const input = document.querySelector('.input');
const button = document.querySelector('.btn');
const listResults = document.querySelector('.results');

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

      //go through the list of elements (loop the array)
      for (let i = 0; i < data.length; i++){
        //store in variables the content (name and image) from each show
        const title = data[i].show.name;
        const image = data[i].show.image;

        //if the result has no image, use filler image
        if (image === null) {
          const fillerImage = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
          const contentNull = `
          <li class="series__item" id="${title}">
          <img class="series__image" src="${fillerImage}" alt="${title}">
          <h2 class="series__title">${title}</h2>
          </li>`;
          listResults.innerHTML += contentNull;
        } else {
          const imgMedium = data[i].show.image.medium;
          const contentMedium = `
          <li class="series__item" id="${title}">
          <img class="series__image" src="${imgMedium}" alt="${title}">
          <h2 class="series__title">${title}</h2>
          </li>`;
          listResults.innerHTML += contentMedium;
        }
      }
      selectedItem ();
    });
}
button.addEventListener('click', searchSeries);

//Declares an array to add favorites before pass them to local storage
let storedFavs = [];

/* Create a function to select user favorite items (series) */
function userFavs (event) {
  const favItem = event.currentTarget;
  favItem.classList.toggle('favs');

  //add favorite series to the array
  if (favItem.classList.contains('favs')) {
    storedFavs.push(favItem.id);

  //remove favorite series to the array
  } else {
    const index = storedFavs.indexOf(favItem.id);
    storedFavs.splice(index, 1);
  }
  //store the information of user favorite series in local storage
  localStorage.setItem('storedFavs', JSON.stringify(storedFavs));
  const savedSeries = JSON.parse(localStorage.getItem('storedFavs'));
  // console.log(savedSeries);
}

//When the user clicks an item, the item is highlighted and vice versa
function selectedItem () {
  const item = document.querySelectorAll('.series__item');
  for (let i = 0; i <item.length; i++){
    item[i].addEventListener('click', userFavs);
  }
}
