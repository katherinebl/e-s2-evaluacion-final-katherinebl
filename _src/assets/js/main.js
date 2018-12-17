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
      const show = data.show;
      //go through the list of elements (loop the array)
      for (let i = 0; i < data.length; i++){
        //store in variables the content of name and image from each show
        const title = data[0].show.name;
        const image = data[0].show.image.original;
        const content = `
      <li class="news__item">
      <h2 class="news__title">${title}</h2>
      <img class="news__image" src="${image}" alt="${title}">
      </li>`;
        //show the search result in the page
        listResults.innerHTML += content;
      }
    });
}

button.addEventListener('click', searchSeries);

