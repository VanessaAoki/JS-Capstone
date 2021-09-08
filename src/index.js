import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import logo from './imgs/logo.png';
import './style.css';

const tvMazeAPIUrl = 'https://api.tvmaze.com/search/shows?q=boys';
const involvementAPIUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
const involvementAppId = 'Wj01840XphoYLqWu02p9';
const postCommentEndPoint = `/apps/${involvementAppId}/comments/`;
const getCommentEndPoint = `/apps/${involvementAppId}/comments?item_id=`;
const commentEndPoint = `/apps/${involvementAppId}/comments/`;
const cardWrapper = document.querySelector('.card-wrapper');
const logoContainer = document.querySelector('.logo');
const modalContainer = document.getElementById('serie__display');

let shows = [];

const headerlogo = () => {
  const myLogo = new Image();
  myLogo.src = logo;
  myLogo.classList.add('logo-image');
};

const displaySerie = () => {
  modalContainer.style.display = "block";
  modalContainer.innerHTML = `
    <div class="modal-content">
      <a class="modal-close
      ">&times;</a>
      <div class="serie-infos">
        <h2 class="show-title">Show Title</h2>
        <p class="show-genre">Genre: </p>
        <p class="show-premier">Release date: </p>
        <p class="show-status">Status: </p>
        <p class="show-language">Language: </p>
        <div class="show-summary">This is a show about something</div>
      </div>
      <div class="modal-comments">
        <h3>Comments</h3>
        <ul class="comments-container"></ul>
      </div>
      <div class="modal-add-comment">
        <h3>Add a comment</h3>
        <form class="comment-form">
          <input type="text" name="comment-author" id="comment-author">
          <input type="text" name="comment-text" id="comment-text">
          <input type="submit" value="Comment">
        </form>
      </div>
    </div>
  `;
  const modalClose = document.querySelector('.modal-close');
  modalClose.addEventListener('click', () => {
    modalDisplayNone();
  });
  window.addEventListener('click', (event) => {
    if (event.target == modalContainer) {
      modalDisplayNone();
    }
  });
};

const displayShowsOnDOM = () => {
  if (!shows.length) cardWrapper.innerHTML = '<p>There are no shows to display</p>';

  shows.forEach((show) => {
    const cardTemplate = `
      <div class="card">
        <img
          src=${show.show.image.original}
          alt="${show.show.name}"
          class="card__image"
        />
        <div class="card__body">
          <h4 class="card__title"><a href=${show.show.url} class="card-URL">${show.show.name} </a> </h4>
          <span class="card__icon">31 <span id="show${show.show.id}" class="likes-icon"> 🤍</span> </span>
        </div>
        <div class="card__footer">
          <button class="card__button ${show.show.id}">Comment</button>
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

const postComments = async () => {
  
  // const modal = document.createElement('a');
  // modal.innerText = 'modal container';
  // modal.setAttribute('href', `#`);
  // logoContainer.append(myLogo, modal);
  // modal.addEventListener('click', displaySerie);
  try {
    const response = await fetch(tvMazeAPIUrl);
    const data = await response.json();

    const commentButton = document.querySelector('.card__button');
    commentButton.addEventListener('click', (event) => {
      console.log(event.target.classList[1])
    });
    
    console.log('data');
  } catch (ex) {
    console.log('Error from server', ex);
  }
}

const modalDisplayNone = () => {
  modalContainer.style.display = "none";
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  fetchShows();
  headerlogo();
  postComments();
});
