import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import './style.css';

const url = "https://api.tvmaze.com/search/shows?q=boys"
let shows = [];
const cardWrapper = document.querySelector('#card-wrapper');

// Let know before you start
