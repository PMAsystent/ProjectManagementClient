import {fireEvent, render, screen, waitFor} from '../../test-utils';
import React from 'react';
import SubtaskView from '../../components/SubtaskView/SubtaskView';

describe('SubTask View Tests', () => {
  let open: boolean;
  let handleOnClose: any;
  beforeEach(() => {
    open = true;
    handleOnClose = () => {
      open = false;
    };
  });

  it('Should render the component', () => {
    render(<SubtaskView handleClose={handleOnClose} />);
    screen.getByText(/Dodaj subtask/);
  });

  it('Should add substep', () => {
    render(<SubtaskView handleClose={handleOnClose} />);
    const input = screen.getByPlaceholderText(/Wpisz nazwę subtaska/);

    fireEvent.change(input, {
      target: { value: 'test subtask' },
    });
  });
});
