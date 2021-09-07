// Hello  Vanessa, I am  commenting this out for now since I could not use the webpack. After we set up webpack properly we can uncomment them. For now it's just to test that my code is working. We'll talk on slack.
// import '@fortawesome/fontawesome-free/js/fontawesome';
// import '@fortawesome/fontawesome-free/js/solid';
// import '@fortawesome/fontawesome-free/js/regular';
// import '@fortawesome/fontawesome-free/js/brands';
// import './style.css';

const url = "https://api.tvmaze.com/search/shows?q=boys"
let shows = [];
const cardWrapper = document.querySelector('#card-wrapper');

const displayShowsOnDOM = () => {
  if (!shows.length)
    return cardWrapper.innerHTML = `<P>There are no movie shows to display`;
  
  shows.forEach((show) => {
    const cardTemplate = `
          <div class="card">
            <img
              src=${show.show.image.original}
              alt=""
              class="card__image"
            />
            <div class="card__body">
              <h4 class="card__title"><a href=${show.show.url} class="card-URL">${show.show.name} </a> </h4>
              <span class="card__icon">31 🤍</span>
            </div>
            <div class="card__footer">
              <button class="card__button">Comment</button>
              <button class="card__button">Reservation</button>
            </div>
          </div>`;
    cardWrapper.innerHTML += cardTemplate;
  });
}

const fetchShows = async () => {
  try {

    const response = await fetch(url);
    const data = await response.json();
    shows = data;
    displayShowsOnDOM();
    console.log(shows);
  } catch (ex) {
    console.log('Error from server', ex);
  }
}

fetchShows();


