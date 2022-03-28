const countriesContainer = document.querySelector('.countries');
const countryCard = document.querySelector('.country');
const searchButton = document.querySelector('.search-button');
const inputField = document.querySelector('.input-field');
const border = document.querySelector('.borders');

let country = {
  fetchCountry: function (country) {
    fetch(`https://restcountries.com/v2/name/${country}`).then(response => {
      response
        .json()
        .then(data => {
          this.displayCountryInformation(data[0]);
          const neigbour = data[0].borders[0];

          if (!neigbour) return;

          return fetch(`https://restcountries.com/v2/alpha/${neigbour}`);
        })
        .then(response => response.json())
        .then(data => this.displayCountryInformation(data));
    });
  },

  displayCountryInformation: function (data) {
    const html = `<article class="country">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${data.population} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = '1';
  },
};

searchButton.addEventListener('click', function () {
  country.fetchCountry(inputField.value);
  inputField.value = '';
});

inputField.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    country.fetchCountry(inputField.value);
    inputField.value = '';
  }
});

border.addEventListener('click', function () {});
