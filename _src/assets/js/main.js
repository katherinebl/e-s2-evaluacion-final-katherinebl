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
      for (let i = 0; i < data.length; i++){
        //create the list of items, with title and image
        const item = document.createElement('li');
        const image = document.createElement('img');
        const title = document.createElement('h2');
        listResults.appendChild(item);
        item.append(image,title);
        console.log('busca!');
      }
    });
}

button.addEventListener('click', searchSeries);

