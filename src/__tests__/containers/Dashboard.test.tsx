import React from 'react';
import { render, screen } from 'test-utils';
import Dashboard from 'containers/Dashboard/Dashboard';
import { waitFor } from '@testing-library/react';

describe('Dashboard Modal Tests', () => {
  it('should render the component', () => {
    render(<Dashboard />);
  });

  it('should render the component - pending', () => {
    render(<Dashboard />);
    screen.getByRole(/progressbar/i);
  });

  it('should render with project Tile - success', async () => {
    render(<Dashboard />);
    await waitFor(() => {
      screen.getByText('Project');
      screen.getByText('50%');
    });
  });

  it('should render with project Tile - success goto details', async () => {
    // TODO: tests
  });
});
