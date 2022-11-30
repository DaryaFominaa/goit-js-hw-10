import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const divEl = document.querySelector('.country-info');
inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
let name = 'ukraine';


function onSearch(evt) {
  evt.preventDefault();
  const searchName = evt.target.value.trim();
  name = searchName;

    if (!searchName) {
    
        Notify.warning('EMPTY FIELD');
        clearList();
        clearMarkup();
    return;
  }
    fetchCountries(searchName)
    .then(data => {
    if (data.length >= 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (data.length > 1 && data.length < 10) {
        createList(data);
        clearMarkup();
      return;
    } else if ((data.length = 1)) {
        createMarkup(data);
        clearList();
      return;
    }
  });
}

function createMarkup(arr) {
  const markup = arr.map(({ flags, name, capital, population, languages }) => `<li>
    <img src="${flags.svg}" alt="${name}" width=300px>
    <h1>${name}</h1>
    <h2 class="h2-value">Capital:<span class="span-value">${capital}</span></h2>
    <h2 class="h2-value">Population:<span class="span-value">${population}</span></h2>
    <h2 class="h2-value">Languages: ${languages.map(el => `<span class="span-value">${el.name}</span>`)}</h2>
    </li>`
    )
    .join('');
  divEl.innerHTML = markup;
}

function createList(arr) {
  const countriesList = arr
    .map(
      item =>
        `<li class="list-list">
    <img class="list-img" src="${item.flags.svg}" alt="${item.name}">
    <h2 class="list-header">${item.name}</h2>
    </li>`
    )
    .join('');
  list.innerHTML = countriesList;
}

function clearList() {
list.innerHTML= '';
 }

 function clearMarkup() {
divEl.innerHTML= '';
 }
