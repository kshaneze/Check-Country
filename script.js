const countriesContainer = document.querySelector('.countries');

let country = {
  fetchCountry: function (country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`).then(response => {
      response.json().then(data => {
        this.displayCountryInformation(data[0]);
        console.log(data);
      });
    });
  },

  displayCountryInformation: function (data) {
    const html = `<article class="country">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.continents}</h4>
      <p class="country__row"><span>👫</span>${data.population} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0]}</p>
      <p class="country__row"><span>💰</span>${data.currencies.name}</p>
    </div>
  </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = '1';
  },
};

country.fetchCountry('Serbia');
