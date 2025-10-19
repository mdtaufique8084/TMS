// Register.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from '../features/auth/Register';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../app/store';

describe('Register Component', () => {
  it('renders email and password inputs', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );

    // Click the register button
    userEvent.click(screen.getByText(/register/i));

    // Check validation error for email
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();

    // Check validation error for password
    expect(await screen.findByText(/password must be at least 6 characters/i)).toBeInTheDocument();
  });

  it('allows typing in email and password fields', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(/password/i) as HTMLInputElement;

    await userEvent.type(emailInput, 'testuser@example.com');
    await userEvent.type(passwordInput, 'abcdef123');

    expect(emailInput.value).toBe('testuser@example.com');
    expect(passwordInput.value).toBe('abcdef123');
  });
});
