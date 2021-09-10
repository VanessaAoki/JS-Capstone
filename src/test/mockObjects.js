const mockObjects = [
  {
    name: 'show 1',
    likes: 55,
  },
  {
    name: 'show 2',
    likes: 1,
  },
  {
    name: 'show 3',
    likes: 123,
  },
  {
    name: 'show 4',
    likes: 87,
  },
  {
    name: 'show 5',
    likes: 6,
  },
  {
    name: 'show 6',
    likes: 43,
  },
  {
    name: 'show 7',
    likes: 90,
  },
  {
    name: 'show 8',
    likes: 3,
  },
];

Object.defineProperty(global, 'mockObjects', {
  value: mockObjects,
});