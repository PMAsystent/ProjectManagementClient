import React from 'react';
import { render, screen } from 'test-utils';
import MainPage from 'containers/MainPage/MainPage';
import { waitFor } from '@testing-library/react';

describe('Main Page Modal Tests', () => {
  it('should render the component - lodaing', () => {
    render(<MainPage />);
    screen.getByRole('progressbar');
  });

  it('should render the component - auth routes', async () => {
    render(<MainPage />);
    await waitFor(() => screen.getByText(/Zaloguj się/i));
  });

  it('should render the component - main routes', async () => {
    const component = render(<MainPage />, {
      auth: {
        accessToken: 'sadasdsgndsaifn',
      },
    });
    await waitFor(() => component.container.querySelector('.main-layout-root'));
  });
});
