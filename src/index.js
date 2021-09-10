/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import logo from './imgs/logo.png';
import { commentsCounter } from './commentsCounter';
import { counters } from './counters';
import './style.css';

const tvMazeAPIUrl = 'https://api.tvmaze.com/search/shows?q=boys';
const idURL = 'https://api.tvmaze.com/shows/';
const involvementAPIUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
const involvementAppId = 'Wj01840XphoYLqWu02p9';
const likeEndPoint = `/apps/${involvementAppId}/likes/`;
const postCommentEndPoint = `/apps/${involvementAppId}/comments/`;
const getCommentEndPoint = `/apps/${involvementAppId}/comments?item_id=`;
const cardWrapper = document.querySelector('.card-wrapper');
const logoContainer = document.querySelector('.logo');
const modalContainer = document.getElementById('serie__display');

let shows = [];

const headerlogo = () => {
  const myLogo = new Image();
  myLogo.src = logo;
  myLogo.classList.add('logo-image');
  logoContainer.appendChild(myLogo);
};

const showsCounter = () => {
  const counter = document.querySelector('.counter');
  counter.innerHTML = counters(shows);
};

const displaySerie = (show) => {
  modalContainer.style.display = 'block';
  modalContainer.innerHTML = `
    <div class="modal-content">
      <span class="modal-close
      ">&times;</span>
      <div class="serie-infos">
        <img
          src=${show.image.original}
          alt="${show.name}"
          class="show-image"
        />
        <h2 class="show-title">${show.name}</h2>
        <p class="show-genre">Genre:<b> ${show.genres}</b></p>
        <p class="show-premier">Release date:<b> ${show.premiered != null ? show.premiered : 'Not released'}</b></p>
        <p class="show-status">Status:<b> ${show.status}</b></p>
        <p class="show-language">Language:<b> ${show.language}</b></p>
        <div class="show-summary">${show.summary}</div>
      </div>
      <div class="modal-comments">
        <div class="comments-section-title">
          <h3>Comments</h3><span id="comments-counter"></span>
        </div>
        <ul class="comments-container" id="comments-section"></ul>
      </div>
      <div class="modal-add-comment">
        <h3>Add a comment</h3>
        <form class="comment-form">
          <input type="text" name="comment-author" id="comment-author" placeholder="Your name">
          <input type="text" name="comment-text" id="comment-text" placeholder="Your insights">
          <input type="submit" value="Comment" id="comment-button">
        </form>
      </div>
    </div>
  `;

  const modalClose = document.querySelector('.modal-close');
  modalClose.addEventListener('click', () => {
    modalDisplayNone();
  });
  const postCommentButton = document.getElementById('comment-button');
  postCommentButton.addEventListener('click', (event) => {
    event.preventDefault();
    postComment(show.id);
  });
  window.addEventListener('click', (event) => {
    if (event.target === modalContainer) {
      modalDisplayNone();
    }
  });
};

const displayShowsOnDOM = () => {
  shows.forEach((show) => {
    if (show.show.id === 15299) {
      cardWrapper.innerHTML = '';
    } else {
      console.log(show);
      const cardTemplate = `
      <div class="card">
        <img
          src=${show.show.image.original}
          alt="${show.show.name}"
          class="card__image"
        />
        <div class="card__body">
          <h4 class="card__title">${show.show.name}</h4>
          <div class="card__icon__container"><span id="likes${show.show.id}" class="card__icon">${show.likes}</span><span id=show${show.show.id} class="likes-icon">&#10084;</span> </div>
        </div>
        <div class="card__footer">
          <button class="card__button ${show.show.id}">Comment</button>
        </div>
      </div>`;
      cardWrapper.innerHTML += cardTemplate;
    }
  });
  showsCounter();
};

const getAllLikes = async (data) => {
  const likesResponse = await fetch(involvementAPIUrl + likeEndPoint);
  const likes = await likesResponse.json();
  const likeHashMap = {};
  for (let i = 0; i < likes.length; i++) {
    likeHashMap[parseInt(likes[i].item_id.slice(4), 10)] = likes[i].likes;
  }
  shows = data.map((item) => (item.likes ? { ...item } : { ...item, likes: likeHashMap[item.show.id] }));
  displayShowsOnDOM();
  postLikes();
  getShowData();
};

const postLikes = async () => {
  const response = await fetch(tvMazeAPIUrl);
  await response.json();
  const likesButtons = document.getElementsByClassName('likes-icon');
  Array.from(likesButtons).forEach((like) => {
    like.addEventListener('click', async (event) => {
      const { id } = event.target;
      const data = { item_id: id };
      if (id && id.includes('show')) {
        await fetch(involvementAPIUrl + likeEndPoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      }

      fetch(involvementAPIUrl + likeEndPoint)
        .then((response) => response.json())
        .then((data) => {
          const tvShow = shows.find(
            (show) => show.show.id === parseInt(id.slice(4), 10),
          );
          const like = data.find((item) => item.item_id === id);
          tvShow.likes = like.likes;
          document.querySelector(`#likes${id.slice(4)}`).innerHTML = tvShow.likes;
        });
    });
  });
};

const fetchShows = async () => {
  const response = await fetch(tvMazeAPIUrl);
  const data = await response.json();
  shows = data;
  getAllLikes(data);
};

const getShowData = async () => {
  const response = await fetch(tvMazeAPIUrl);
  await response.json();
  const commentButtons = document.getElementsByClassName('card__button');
  Array.from(commentButtons).forEach((commentButton) => {
    commentButton.addEventListener('click', async (event) => {
      const id = event.target.classList[1];
      const res = await fetch(idURL + id);
      const show = await res.json();
      getComments(id);
      displaySerie(show);
    });
  });
};

const postComment = (id) => {
  const inputName = document.getElementById('comment-author');
  const inputComment = document.getElementById('comment-text');
  return fetch(involvementAPIUrl + postCommentEndPoint, {
    method: 'POST',
    body: JSON.stringify({
      item_id: `${id}`,
      username: `${inputName.value}`,
      comment: `${inputComment.value}`,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(() => {
      window.location.reload();
    });
};

const getComments = (id) => {
  fetch(involvementAPIUrl + getCommentEndPoint + id)
    .then((response) => response.json())
    .then((json) => {
      const commentSection = document.getElementById('comments-section');
      const fullCounter = json.length;
      let minusCounter = 0;
      json.forEach((comment) => {
        if (comment.username === '' || comment.comment === '') {
          minusCounter++;
        } else {
          const liComment = document.createElement('li');
          liComment.innerHTML = `<p>${comment.creation_date} <b>${comment.username}</b>: ${comment.comment}</p>`;
          commentSection.appendChild(liComment);
        }
      });
      commentsCounter(fullCounter, minusCounter);
    });
};

const modalDisplayNone = () => {
  modalContainer.style.display = 'none';
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  fetchShows();
  headerlogo();
});
