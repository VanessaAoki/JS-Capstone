/* eslint-disable no-undef */
import { counters } from '../counters';

describe('Counts the amount of shows that we have in the list', () => {
  test('There are 8 shows in the list', () => {
    const show = mockObjects;
    counters(show);
    expect.stringContaining('Here are 8 movies with highest ratings in August 2021');
  });
});