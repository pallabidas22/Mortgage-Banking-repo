import mediaQuery from 'css-mediaquery';

beforeAll(() => {
  // Set the initial/default matchMedia implementation
  // for Mobile First development
  window.matchMedia = createMatchMedia(576);
});

afterEach(() => {
  // Reset matchMedia after each test
  window.matchMedia = createMatchMedia(576);
});

export function createMatchMedia(width) {
  window.matchMedia = (query) => ({
    matches: mediaQuery.match(query, {
      width,
    }),
    addListener: () => {},
    removeListener: () => {},
  });
}