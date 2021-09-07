import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import logo from './imgs/logo.png';
import './style.css';

const tvMazeAPIUrl = 'https://api.tvmaze.com/search/shows?q=boys';
const involvementAPIUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
const involvementAppId = 'Wj01840XphoYLqWu02p9';
const cardWrapper = document.querySelector('.card-wrapper');
const logoContainer = document.querySelector('.logo');

let shows = [];

const headerlogo = () => {
  const myLogo = new Image();
  myLogo.src = logo;
  myLogo.classList.add('logo-image');
  logoContainer.appendChild(myLogo);
};

const displayShowsOnDOM = () => {
  if (!shows.length) cardWrapper.innerHTML = '<P>There are no movie shows to display';

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
              <span class="card__icon">31 <span id=show${show.show.id} class="likes-icon"> 🤍</span> </span>
            </div>
            <div class="card__footer">
              <button class="card__button">Comment</button>
            </div>
          </div>`;
    cardWrapper.innerHTML += cardTemplate;
  });
};

const fetchShows = async () => {
  try {
    const response = await fetch(tvMazeAPIUrl);
    const data = await response.json();
    shows = data;
    displayShowsOnDOM();
    console.log(shows);
  } catch (ex) {
    console.log('Error from server', ex);
  }
};

fetchShows();

// Event Listeners
document.addEventListener('click', async (event) => {
  const { id } = event.target;
  const likesEndPoint = `/apps/${involvementAppId}/likes/`;
  const data = { item_id: id };
  console.log(involvementAPIUrl + likesEndPoint);
  console.log(JSON.stringify(data));
  if (id && id.includes('show')) {
    const response = await fetch(involvementAPIUrl + likesEndPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(response);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  headerlogo();
});
