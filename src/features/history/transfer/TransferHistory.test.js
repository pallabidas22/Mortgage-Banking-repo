import { render, screen, act, fireEvent } from '@testing-library/react';
import TransferHistory from './TransferHistory';
import { server } from '../../tests/server';
import { http, HttpResponse } from 'msw';
import { API, HOST } from '../../../constants/api';

describe('Transfer History', () => {
  test('renders loading', () => {
    render(<TransferHistory />);
    const loading = screen.getByTestId('loading');
    expect(loading).toBeInTheDocument();
  });

  test('render final page', () => {
    const { wrapper } = render(<TransferHistory />);
    expect(screen.queryByTestId('loading')).toBeFalsy();
    expect(wrapper).toMatchSnapshot();
  })

  test('should render trigger error modal on API error', () => {
    render(<TransferHistory />);
    server.use(http.get(`${HOST}${API.TRANSFER_HISTORY}`, () => {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Not found',
      })
    }),)
    expect(screen.queryByTestId('loading')).toBeFalsy();
    expect(screen.getByTestId('error-modal')).toBeInTheDocument();
  })


  test('should render trigger on API scroll', () => {
    render(<TransferHistory />);
    expect(screen.queryByTestId('loading')).toBeFalsy();
    const table = screen.getByTestId('transfer-history')
    expect(table).toBeInTheDocument();

    fireEvent.scroll(table, {
      target: {
        scrollTop: 1000
      }
    })
  })
})
