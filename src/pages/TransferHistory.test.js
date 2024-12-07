import { render, screen } from '@testing-library/react';
import TransferHistory from './TransferHistory';

describe('Transfer History', () => {
  test('renders page', () => {
    render(<TransferHistory />);
    const loading = screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();
  });
})
