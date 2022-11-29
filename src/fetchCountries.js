import { Notify } from 'notiflix/build/notiflix-notify-aio';
export default function fetchCountries(name) {
     const BASE_URL = 'https://restcountries.com/v2/name/';
  return (
      fetch(`${BASE_URL}${name}?fields=name,capital,population,languages,flags`)
      .then(resp => {
          if (!resp.ok) {
              Notify.failure( "Oops, there is no country with that name")
              throw new Error(resp.statusText);
              
          } return resp.json();
          
          
      })
      
      .catch(err => console.error(err))
  );
}