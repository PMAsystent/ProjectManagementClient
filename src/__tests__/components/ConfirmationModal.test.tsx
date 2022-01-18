import { render, screen } from '../../test-utils';
import React from 'react';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

describe('Confirmation Modal Tests', () => {
  let open: boolean;
  let handleOnClose: any;
  beforeEach(() => {
    open = true;
    handleOnClose = () => {
      open = false;
    };
  });

  it('Should render the component', () => {
    render(<ConfirmationModal title={'ekran'} text={'usuń coś'} open={open} handleClose={handleOnClose} />);
    screen.getByText('ekran');
    screen.getByText(/usuń coś/);
  });
});
