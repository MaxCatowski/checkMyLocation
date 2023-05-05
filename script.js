'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const search = document.querySelector('.searchCountry');
const reset = document.querySelector('.btn-reset');

///////////////////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     // console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // console.log(Object.entries(data.currencies).flat()[1].name);

//     const html = `

//   <article class="country">
//   <img class="country__img" src="${data.flags.png}" />
//   <div class="country__data">
//     <h3 class="country__name">${data.name.common}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       +data.population / 1000000
//     ).toFixed(1)} mln</p>
//     <p class="country__row"><span>🗣️</span>${
//       Object.entries(data.languages).flat()[1]
//     }</p>
//     <p class="country__row"><span>💰</span> ${
//       Object.entries(data.currencies).flat()[1].name
//     }</p>
//   </div>

//   `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };
// getCountryData('usa');

////////////////////////////////     1     //////////////////////////

const renderCountry = function (data, className = '') {
  const html = `

  <article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} mln</p>
    <p class="country__row"><span>🗣️</span>${
      Object.entries(data.languages).flat()[1]
    }</p>
    <p class="country__row"><span>💰</span> ${
      Object.entries(data.currencies).flat()[1].name
    }</p>
  </div>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderEror = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

// ////////////////////////////////     2     //////////////////////////

// const getCountryAndNeighbour = function (country) {
//   //Ajax call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     // console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     //Render country 1
//     renderCountry(data);
//     // console.log(Object.entries(data.currencies).flat()[1].name);
//     //get neighbour country 2
//     const neighbourCountry =
//       data.borders?.[Math.floor(Math.random() * data.borders.length)];
//     console.log(data.borders);
//     //Ajax call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open(
//       'GET',
//       `https://restcountries.com/v3.1/alpha/${neighbourCountry}`
//     );
//     request2.send();

//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);
//       //Render country 2
//       renderCountry(data2, 'neighbour ');
//     });
//   });
// };
// getCountryAndNeighbour('usa');

///////////////example/////////////////////
// setTimeout(() => {
//   console.log(`1 second passed`);
//   setTimeout(() => {
//     console.log(`2 second passed`);
//     setTimeout(() => {
//       console.log(`3 second passed`);
//       setTimeout(() => {
//         console.log(`4 second passed`);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);
///////////////////////////////////////////////////////

// const request = fetch('https://restcountries.com/v3.1/name/japan');

// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour =
//         data[0].borders?.[Math.floor(Math.random() * data[0].borders.length)];
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })

//     .then(data => renderCountry(data[0], 'neighbour'))
//     //////in the case of error occure
//     .catch(err => {
//       console.error(`${err}  🛑🛑🛑`);
//       renderEror(`Something went wrong 🛑🛑🛑 ${err.message}.Try again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
////////////////////////////////////////////////////////////////////////////
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(console.log(position)),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      // const neighbour =
      //   data[0].borders?.[Math.floor(Math.random() * data[0].borders.length)];
      // return getJSON(
      //   `https://restcountries.com/v3.1/alpha/${neighbour}`,
      //   'There are no neighbour countries'
      // );
    })

    // .then(data => renderCountry(data[0], 'neighbour'))
    //////in the case of error occure
    .catch(err => {
      console.error(`${err}  🛑🛑🛑`);
      renderEror(`Something went wrong 🛑🛑🛑 ${err.message}.Try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getPosition().then(response =>
    whereAmI(`${response.coords.latitude}, ${response.coords.longitude}`)
  );
});

reset.addEventListener('click', function () {
  location.reload();
});
//////////////////////////////////////////////////////////////////////////////////

const whereAmI = function (lat, lgt) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lgt}`
  ).then(response =>
    response
      .json()

      .then(data => getCountryData(data.countryName))
  );
};

// whereAmI();

//  whereAmI(-33.933, 18.474);

// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolve promise 1').then(response => console.log(response));
// Promise.resolve('Resolve promise 2').then(response => {
//   for (let i = 0; i < 1000000; i++) {}
//   console.log(response);
// });
// console.log('Test end');
///////////////////////////////////////////////////////////////////////////////
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening ');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve(countriesContainer.insertAdjacentText('beforeend', 'You win'));
//     } else {
//       reject(new Error('You lost your money'));
//     }
//   }, 2000);
// });

// lotteryPromise
//   .then(response => response)
//   .catch(err => {
//     console.error(err);

//     renderEror(`${err.message}.Try again`);
//   })
//   .finally(() => {
//     countriesContainer.style.opacity = 1;
//   });

/////////////////////////////////////////////////////////////////////////////////////
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log(' i waited for 1 seconds');
//     return wait(1);
//   })
//   .then(() => {
//     console.log(' i waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => {
//     console.log(' i waited for 3 seconds');
//     return wait(1);
//   })
//   .then(() => {
//     console.log(' i waited for 4 seconds');
//     return wait(1);
//   })
//   .then(() => {
//     console.log(`i waited for 5 seconds`);
//   });

// Promise.resolve('abc').then(response => console.log(response));
// Promise.reject(new Error('Problem with abc'))
//   .catch(response => {
//     console.error(response);
//     countriesContainer.insertAdjacentText('beforeend', `${response.message}`);
//   })
//   .finally(() => {
//     countriesContainer.style.opacity = 1;
//   });

// getPosition().then(response =>
//   whereAmI(`${response.coords.latitude}, ${response.coords.longitude}`)
// );
