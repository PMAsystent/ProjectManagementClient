import React from 'react';
import { fireEvent, render, screen } from 'test-utils';
import AddProjectModal from 'containers/AddProjectModal/AddProjectModal';
import { waitFor } from '@testing-library/react';

describe('Add Project Modal Tests', () => {
  let open: boolean;
  let handleOnClose: any;
  beforeEach(() => {
    open = true;
    handleOnClose = () => {
      open = false;
    };
  });

  it('should render the component', () => {
    render(<AddProjectModal open={open} handleClose={handleOnClose} />);
  });

  it('should render the component with required error', async () => {
    render(<AddProjectModal open={open} handleClose={handleOnClose} />);
    fireEvent.click(screen.getByText('Zapisz'));
    await waitFor(() => {
      screen.getByText('Data zakończenia jest wymagana');
      screen.getByText('Opis jest wymagany');
      screen.getByText('Nazwa jest wymagana');
    });
  });

  it('sholud render the component with other eroros', async () => {
    render(<AddProjectModal open={open} handleClose={handleOnClose} />);
    const inputName = screen.getByPlaceholderText('Wpisz nazwę');
    const textareaDescription = screen.getByPlaceholderText('Wpisz opis');
    const datePicker = screen.getByPlaceholderText('mm/dd/yyyy');

    fireEvent.change(inputName, {
      target: { value: 'ts' },
    });

    fireEvent.change(textareaDescription, {
      target: { value: 'ts' },
    });

    fireEvent.change(datePicker, {
      target: { value: 'ts' },
    });

    fireEvent.click(screen.getByText('Zapisz'));

    await waitFor(() => {
      screen.getByText(/Nazwa musi mieć conajmniej 3 znaki/i);
      screen.getByText(/Opis musi mieć conajmniej 20 znaków/i);
      screen.getByText(/Data zakończenia jest wymagana/i);
    });
  });

  it('sholud post a form - rejected', async () => {
    render(<AddProjectModal open={open} handleClose={handleOnClose} />);
    const inputName = screen.getByPlaceholderText('Wpisz nazwę');
    const textareaDescription = screen.getByPlaceholderText('Wpisz opis');
    const datePicker = screen.getByPlaceholderText('mm/dd/yyyy');

    fireEvent.change(inputName, {
      target: { value: 'Test' },
    });

    fireEvent.change(textareaDescription, {
      target: { value: 'New new new enwe wnew enwenw enwe nwe nwenw newn enwn enwn' },
    });

    fireEvent.change(datePicker, {
      target: { value: '12/29/2021' },
    });

    fireEvent.click(screen.getByText('Zapisz'));

    await waitFor(() => {
      screen.getByText('Dodanie projektu nie powiodło się');
    });
  });

  it('sholud post a form - success', async () => {
    render(<AddProjectModal open={open} handleClose={handleOnClose} />);
    const inputName = screen.getByPlaceholderText('Wpisz nazwę');
    const textareaDescription = screen.getByPlaceholderText('Wpisz opis');
    const datePicker = screen.getByPlaceholderText('mm/dd/yyyy');

    fireEvent.change(inputName, {
      target: { value: 'Test success' },
    });

    fireEvent.change(textareaDescription, {
      target: { value: 'New new new enwe wnew enwenw enwe nwe nwenw newn enwn enwn' },
    });

    fireEvent.change(datePicker, {
      target: { value: '12/29/2021' },
    });

    fireEvent.click(screen.getByText('Zapisz'));

    await waitFor(() => {
      screen.getByText('Dodano projekt');
    });
  });

  it('should assign user', async () => {
    render(<AddProjectModal open={open} handleClose={handleOnClose} />);
    const autocomplete = screen.getByPlaceholderText('Szukaj');
    if (autocomplete) {
      fireEvent.change(autocomplete, {
        target: { value: 't' },
      });
    }

    await waitFor(() => {
      screen.getByText('test@example.com');
    });
  });
});
