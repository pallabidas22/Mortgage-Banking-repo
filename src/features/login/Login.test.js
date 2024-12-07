import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "../../contexts/authContext";
import Login from './Login';
import { authPost, validCustomerId } from './authCall';

jest.mock('./authCall', () => ({
    authPost: jest.fn(),
    validCustomerId: jest.fn(),
}));

describe('Login Component', () => {
    const renderWithContext = () =>
        render(
            <AuthProvider>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </AuthProvider>
        );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders Login component', () => {
        renderWithContext();
        expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Customer Id/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter password/i)).toBeInTheDocument();
    });

    test('displays validation error for empty CustomerId', () => {
        renderWithContext();
        const loginButton = screen.getByRole('button', { name: /Sign in/i });
        fireEvent.click(loginButton);
        expect(screen.getByText(/Customer Id is not valid/i)).toBeInTheDocument();
    });

    test('displays validation error for empty Password', () => {
        renderWithContext();
        const loginButton = screen.getByRole('button', { name: /Sign in/i });
        fireEvent.click(loginButton);

        expect(screen.getByText(/Password is not valid/i)).toBeInTheDocument();
    });

    test('calls API and navigates on successful login', async () => {
        authPost.mockResolvedValueOnce({ customerId: 123 });
        validCustomerId.mockResolvedValueOnce([{ customerId: 123 }]);

        renderWithContext();

        fireEvent.change(screen.getByPlaceholderText(/Customer Id/i), {
            target: { value: '123' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Enter password/i), {
            target: { value: 'Password@123' },
        });

        const loginButton = screen.getByRole('button', { name: /Sign in/i });
        fireEvent.click(loginButton);

        await waitFor(() =>
            expect(authPost).toHaveBeenCalledWith('123', 'Password@123')
        );
        await waitFor(() => expect(validCustomerId).toHaveBeenCalled());
    });

    test('displays error on failed login', async () => {
        authPost.mockResolvedValueOnce({ customerId: 123 });
        validCustomerId.mockResolvedValueOnce([]);

        renderWithContext();

        fireEvent.change(screen.getByPlaceholderText(/Customer Id/i), {
            target: { value: '123' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Enter password/i), {
            target: { value: 'Password@123' },
        });

        const loginButton = screen.getByRole('button', { name: /Sign in/i });
        fireEvent.click(loginButton);

        await waitFor(() => expect(validCustomerId).toHaveBeenCalled());
        expect(screen.getByText(/Invalid Customer Id and Password./i)).toBeInTheDocument();
    });
});
