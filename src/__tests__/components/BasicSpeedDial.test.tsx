import React from 'react';
import {fireEvent, render, screen, waitFor} from 'test-utils';
import BasicSpeedDial from 'components/BasicSpeedDial/BasicSpeedDial';
import AddIcon from '@mui/icons-material/Add';

describe('Basic Speed Dial Tests', () => {
  it('Should render the component', () => {
    render(<BasicSpeedDial actions={[]} />);
  });
  it('Should render provided action', async () => {
    render(
      <BasicSpeedDial
        actions={[
          {
            icon: <AddIcon />,
            name: 'Dodaj nowy projekt',
            handleOnClick: () => {
              return true;
            },
          },
        ]}
      />
    );

    const speedDial = screen.getByTestId('speedDial');
    fireEvent.click(speedDial);
    await waitFor(() => screen.getByTestId('speedDial-action'));
  });
});
