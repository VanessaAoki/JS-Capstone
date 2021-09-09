// Hello  Vanessa, I am  commenting this out for now since I could not use the webpack. After we set up webpack properly we can uncomment them. For now it's just to test that my code is working. We'll talk on slack.
// import '@fortawesome/fontawesome-free/js/fontawesome';
// import '@fortawesome/fontawesome-free/js/solid';
// import '@fortawesome/fontawesome-free/js/regular';
// import '@fortawesome/fontawesome-free/js/brands';
// import './style.css';

const tvMazeAPIUrl = "https://api.tvmaze.com/search/shows?q=boys"
const involvementAPIUrl = "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi"
let shows = [];
const involvementAppId = "Wj01840XphoYLqWu02p9"
const likeEndPoint = `/apps/${involvementAppId}/likes/`;
const cardWrapper = document.querySelector('.card-wrapper');

const displayShowsOnDOM = () => {
  // if (!shows.length)
  //   return cardWrapper.innerHTML = `<P>There are no movie shows to display`;
  
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
              <span class="card__icon"><span id="likes${show.show.id}">${show.likes}</span> <span id=show${show.show.id} class="likes-icon"> 🤍</span> </span>
            </div>
            <div class="card__footer">
              <button class="card__button">Comment</button>
              <button class="card__button">Reservation</button>
            </div>
          </div>`;
    cardWrapper.innerHTML += cardTemplate;
  });
};

// Use another function to call each one of the show likes

const fetchShows = async () => {
  try {

    const response = await fetch(tvMazeAPIUrl);
    const data = await response.json();
    const likesResponse = await fetch(involvementAPIUrl + likeEndPoint);
    const likes = await likesResponse.json();
    console.log(likes)
    shows = data;
    const likeHashMap = {};
    for (let i = 0; i < likes.length; i++) {
      likeHashMap[parseInt(likes[i].item_id.slice(4))] = likes[i].likes;
    }
    console.log(likeHashMap);
    shows = data.map((item) =>
      item.likes ? { ...item } : { ...item, likes: likeHashMap[item.show.id] }
    );
    console.log(shows);
    displayShowsOnDOM();
  } catch (ex) {
    console.log('Error from server', ex);
  }
};
fetchShows();

displayShowsOnDOM();

document.addEventListener("click", async(event) => {
  const id = event.target.id;
  const data = { item_id: id }
  if (id && id.includes("show")) {
    const response = await fetch(involvementAPIUrl + likeEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    console.log(response)
  }

fetch(involvementAPIUrl + likeEndPoint)
.then((response) => response.json())
.then((data) => {
  // console.log(data);
  const tvShow = shows.find(
    (show) => show.show.id === parseInt(id.slice(4))
  );
  const like = data.find((item) => item.item_id === id);
  tvShow.likes = like.likes;
  console.log(tvShow);
  document.querySelector(`#likes${id.slice(4)}`).innerHTML =
    tvShow.likes;
});

})




