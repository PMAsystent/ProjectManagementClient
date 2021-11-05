import { fireEvent, render, screen, waitFor } from '../../test-utils';
import React from 'react';
import Register from '../../containers/Register/Register';

describe('Register Unit Tests', () => {
  it('Should render the component', () => {
    render(<Register />);
  });

  it('Should render inputs error - required', async () => {
    render(<Register />);

    fireEvent.click(screen.getByText('Zarejestruj się'));
    await waitFor(() => screen.getByText(/Nazwa jest wymagana!/i));
    await waitFor(() => screen.getByText(/Email jest wymagany!/i));
    await waitFor(() => screen.getByText(/Hasło jest wymagane!/i));
    await waitFor(() => screen.getByText(/Potwierdzenie hasła jest wymagane!/i));
  });

  it('Should render password error - regex', async () => {
    render(<Register />);

    const password = screen.getByPlaceholderText('Hasło');
    fireEvent.change(password, {
      target: { value: '1234567890' },
    });
    fireEvent.click(screen.getByText('Zarejestruj się'));
    await waitFor(() => screen.getByText(/Hasło musi zawierać dużą literę, cyfrę oraz znak specjalny!/i));
  });

  it('Should render confirm password error - password must be the same', async () => {
    render(<Register />);

    const password = screen.getByPlaceholderText('Hasło');
    fireEvent.change(password, {
      target: { value: 'Zaq!2wsxcde3' },
    });
    const confirmPassword = screen.getByPlaceholderText('Powtórz hasło');
    fireEvent.change(confirmPassword, {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByText('Zarejestruj się'));
    await waitFor(() => screen.getByText(/Hasła muszą być takie same!/i));
  });

  it('Should render confirm password error - min length password', async () => {
    render(<Register />);

    const password = screen.getByPlaceholderText('Hasło');
    fireEvent.change(password, {
      target: { value: '1234' },
    });

    fireEvent.click(screen.getByText('Zarejestruj się'));
    await waitFor(() => screen.getByText(/Hasło musi być dłuższe niż 8 znaków!/i));
  });

  it('Should render confirm email error - wrong email', async () => {
    render(<Register />);

    const email = screen.getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: 'test' },
    });

    fireEvent.click(screen.getByText('Zarejestruj się'));
    await waitFor(() => screen.getByText(/Email jest niepoprawny!/i));
  });
});

describe('Register Integration Tests', () => {
  it('should register success', async () => {
    render(<Register />);

    const userName = screen.getByPlaceholderText('Nazwa użytkownika');
    fireEvent.change(userName, {
      target: { value: 'test' },
    });

    const email = screen.getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: 'test@test.com' },
    });

    const password = screen.getByPlaceholderText('Hasło');
    fireEvent.change(password, {
      target: { value: 'Zaq!2wsxcde' },
    });
    const confirmPassword = screen.getByPlaceholderText('Powtórz hasło');
    fireEvent.change(confirmPassword, {
      target: { value: 'Zaq!2wsxcde' },
    });

    fireEvent.click(screen.getByText('Zarejestruj się'));
    await waitFor(() => screen.getByText(/Zarejestrowano pomyślnie/i));
  });

  it('should register failed', async () => {
    render(<Register />);

    const userName = screen.getByPlaceholderText('Nazwa użytkownika');
    fireEvent.change(userName, {
      target: { value: 'failed' },
    });

    const email = screen.getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: 'test@test.com' },
    });

    const password = screen.getByPlaceholderText('Hasło');
    fireEvent.change(password, {
      target: { value: 'Zaq!2wsxcde' },
    });
    const confirmPassword = screen.getByPlaceholderText('Powtórz hasło');
    fireEvent.change(confirmPassword, {
      target: { value: 'Zaq!2wsxcde' },
    });

    fireEvent.click(screen.getByText('Zarejestruj się'));
    await waitFor(() => screen.getByText(/Nie udało się zarejestrować/i));
  });
});
