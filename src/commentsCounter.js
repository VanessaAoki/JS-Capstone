const commentsCounter = (fullCounter, minusCounter) => {
  const commentCounter = document.getElementById('comments-counter');
  const counter = fullCounter - minusCounter;
  commentCounter.innerText = `(${counter})`;
}

export { commentsCounter }