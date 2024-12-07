import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import AccountList from './AccountList';

jest.mock('axios');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

const mockAccounts = [
    {
        accountNumber: '1234567890',
        type: 'Savings',
        balance: 1000.00
    },
    {
        accountNumber: '0987654321',
        type: 'Mortgage',
        balance: 250000.00
    }
];

describe('AccountList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders accounts when API call is successful', async () => {
        axios.get.mockResolvedValueOnce({ data: mockAccounts });
        
        render(<AccountList />, { wrapper: BrowserRouter });
        
        await waitFor(() => {
            expect(screen.getByText('1234567890')).toBeInTheDocument();
        });
    });

    test('filters accounts by type', async () => {
        axios.get.mockResolvedValueOnce({ data: mockAccounts });
        
        render(<AccountList />, { wrapper: BrowserRouter });
        
        await waitFor(() => {
            expect(screen.getAllByRole('article')).toHaveLength(2);
        });

        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Savings' } });
        
        expect(screen.getAllByRole('article')).toHaveLength(1);
        expect(screen.getByText('1234567890')).toBeInTheDocument();
        expect(screen.queryByText('0987654321')).not.toBeInTheDocument();
    });
}); 