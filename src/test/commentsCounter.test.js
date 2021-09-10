/* eslint-disable no-undef */
import { commentsCounter } from '../commentsCounter';

describe('Counts the comments from popup page', () => {
  test('Has 8 comments, but 3 of the are empty comments, should return 5', () => {
    document.body.innerHTML = mockInnerHTML;
    const fullCounter = 8;
    const minusCounter = 3;
    commentsCounter(fullCounter, minusCounter);
    const commentCounter = document.getElementById('comments-counter');
    expect(commentCounter.innerText).toBe('(5)');
  });

  test('Has 115 comments, but 50 of the are empty comments, should return 65', () => {
    document.body.innerHTML = mockInnerHTML;
    const fullCounter = 115;
    const minusCounter = 50;
    commentsCounter(fullCounter, minusCounter);
    const commentCounter = document.getElementById('comments-counter');
    expect(commentCounter.innerText).toBe('(65)');
  });
});