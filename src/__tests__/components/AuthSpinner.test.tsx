import React from 'react';
import AuthSpinner from '../../components/AuthSpinner/AuthSpinner';
import { render } from 'test-utils';

describe('Auth Sipnner Tests', () => {
  it('Should render the component', () => {
    render(<AuthSpinner />);
  });
});
