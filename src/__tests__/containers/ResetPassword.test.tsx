import { render, screen } from '../../test-utils';
import React from 'react';
import ResetPassword from '../../containers/ResetPassword/ResetPassword';
import { fireEvent, waitFor } from '@testing-library/react';

describe('Reset Password Tests', () => {
  it('Should render the component', () => {
    render(<ResetPassword />);
    screen.getAllByText('Zmień hasło');
  });

  it('Should show errors', async () => {
    render(<ResetPassword />);
    const elements = screen.getAllByText('Zmień hasło');
    fireEvent.click(elements[1]);
    await waitFor(() => {
      screen.getAllByText('Email jest wymagany!');
      screen.getByText('Hasło jest wymagane!');
      screen.getByText('Potwierdzenie hasła jest wymagane!');
    });
  });

  it('Should show errors - password errors', async () => {
    render(<ResetPassword />);
    const elements = screen.getAllByText('Zmień hasło');
    const password = screen.getByPlaceholderText('Nowe Hasło');
    const confirmPassword = screen.getByPlaceholderText('Powtórz Nowe Hasło');

    if (password) {
      fireEvent.change(password, {
        target: { value: 'T' },
      });
    }

    if (confirmPassword) {
      fireEvent.change(confirmPassword, {
        target: { value: 'Tsss' },
      });
    }

    fireEvent.click(elements[1]);

    await waitFor(() => {
      screen.getByText('Hasło musi być dłuższe niż 8 znaków!');
      screen.getByText('Hasła muszą być takie same!');
    });
  });

  it('Should show errors - email errors', async () => {
    render(<ResetPassword />);
    const elements = screen.getAllByText('Zmień hasło');
    const email = screen.getByPlaceholderText('Email');
    const confirmEmail = screen.getByPlaceholderText('Powtórz email');

    if (email) {
      fireEvent.change(email, {
        target: { value: 'T' },
      });
    }

    if (confirmEmail) {
      fireEvent.change(confirmEmail, {
        target: { value: 'Tsss@gmail.com' },
      });
    }

    fireEvent.click(elements[1]);

    await waitFor(() => {
      screen.getByText('Email jest niepoprawny!');
      screen.getByText('Emaile muszą być takie same!');
    });
  });
});
