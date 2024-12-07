import { render, screen } from '@testing-library/react';
import TransferHistory from './TransferHistory';
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

test('renders Transfer History page', () => {
  render(<TransferHistory />);
  const columnName = screen.getByText(/Transaction Date/i);
  expect(columnName).toBeInTheDocument();
});
