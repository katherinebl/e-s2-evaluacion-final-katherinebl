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
        // const id = data[i].show.id;

        //If the result has no image, use filler image (AL PARECER FUNCIONA, REVÍSALO AL FINAL)
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
          <li class="series__item">
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

//create a function to select user favorite items
function userFavs (event) {
  const favItem = event.currentTarget;
  favItem.classList.toggle('favs');

  //store the information of user favorite items in the localStorage


  //Add favorite series to local storage --> SE BORRA CUANDO REINICIO
  if (favItem.classList.contains('favs') === true) {
    storedFavs.push(favItem.innerHTML);
    console.log(storedFavs);

  } else {
    remove(storedFavs, favItem.innerHTML);
    console.log(storedFavs);
  }

  //Remove favorite series from local storage
  function remove (array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  localStorage.setItem('storedFavs', JSON.stringify(storedFavs));
  const  savedSeries= JSON.parse(localStorage.getItem('storedFavs'));
  console.log(savedSeries.length);
}
let storedFavs = [];


function selectedItem () {
  const li = document.querySelectorAll('.series__item');
  for (let i = 0; i <li.length; i++){
    li[i].addEventListener('click', userFavs);
  }
}
