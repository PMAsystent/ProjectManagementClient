import {fireEvent, render, screen, waitFor} from '../../test-utils';
import React from 'react';
import ForgotPassword from 'containers/ForgotPassword/ForgotPassword';


describe('ForgotPassword Unit Tests', () => {
  it('Should render the component', () => {
    render(<ForgotPassword />);
  });

  it('Should render email and confirm email error - required', async () => {
    render(<ForgotPassword />);

    fireEvent.click(screen.getByText('Wyślij kod'));
    await waitFor(() => screen.getAllByText(/Email jest wymagany!/i));
  });

  it('Should render email and confirm email error - wrong emails', async () => {
    render(<ForgotPassword />);

    const email = screen.getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: 'Test' },
    });

    const confirmEmail = screen.getByPlaceholderText('Powtórz email');
    fireEvent.change(confirmEmail, {
      target: { value: 'Test' },
    });

    fireEvent.click(screen.getByText('Wyślij kod'));
    await waitFor(() => screen.getAllByText(/Email jest niepoprawny!/i));
  });

  it('Should render confirm email error - emails not the same', async () => {
    render(<ForgotPassword />);

    const email = screen.getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: 'Test123@gmail.com' },
    });

    const confirmEmail = screen.getByPlaceholderText('Powtórz email');
    fireEvent.change(confirmEmail, {
      target: { value: 'Test@gmail.com' },
    });

    fireEvent.click(screen.getByText('Wyślij kod'));
    await waitFor(() => screen.getByText(/Emaile muszą być takie same!/i));
  });
});

describe('ForgotPassword Integration Tests', () => {
  // TODO: SUCCESS / FAILED / PENDING TESTS
});
