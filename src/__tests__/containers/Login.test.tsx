import React from 'react';
import { render, screen, fireEvent, waitFor } from 'test-utils';
import Login from '../../containers/Login/Login';

describe('Login Unit Tests', () => {
  it('Should render the component', () => {
    render(<Login />);
  });

  it('Should render login error - required', async () => {
    render(<Login />);

    fireEvent.click(screen.getByText('Zaloguj się'));
    await waitFor(() => screen.getByText(/Email jest wymagany!/i));
  });

  it('Should render password error - required', async () => {
    render(<Login />);
    fireEvent.click(screen.getByText('Zaloguj się'));

    await waitFor(() => screen.getByText(/Hasło jest wymagane!/i));
  });

  it('Should render login error - not email', async () => {
    render(<Login />);

    const email = screen.getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: 'Test' },
    });
    fireEvent.click(screen.getByText('Zaloguj się'));

    await waitFor(() => screen.getByText(/Email jest niepoprawny!/i));
  });

  it('Should render password error - min', async () => {
    render(<Login />);

    const password = screen.getByPlaceholderText('Hasło');
    fireEvent.change(password, {
      target: { value: '1234' },
    });
    fireEvent.click(screen.getByText('Zaloguj się'));

    await waitFor(() => screen.getByText(/Hasło musi być dłuższe niż 8 znaków!/i));
  });

  it('Should render password error - regex', async () => {
    render(<Login />);

    const password = screen.getByPlaceholderText('Hasło');
    fireEvent.change(password, {
      target: { value: '1234567890' },
    });
    fireEvent.click(screen.getByText('Zaloguj się'));
    await waitFor(() => screen.getByText(/Hasło musi zawierać dużą literę, cyfrę oraz znak specjalny!/i));
  });
});

describe('Login Integration Tests', () => {
  // TODO: SUCCESS / FAILED / PENDING TESTS
});
