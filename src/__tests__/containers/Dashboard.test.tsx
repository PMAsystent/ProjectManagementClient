import React from 'react';
import { render, screen } from 'test-utils';
import Dashboard from 'containers/Dashboard/Dashboard';
import { waitFor } from '@testing-library/react';

describe('Dashboard Modal Tests', () => {
  it('should render the component', () => {
    render(<Dashboard />);
  });

  it('should render without project Tile', () => {
    render(<Dashboard />);
    screen.getByText(/No projects/i);
  });

  it('should render with project Tile', async () => {
    render(<Dashboard />);
    await waitFor(() => screen.getByText(/test/i));
  });
});
