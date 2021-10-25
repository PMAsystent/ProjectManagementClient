import { render, screen } from '../../test-utils';
import React from 'react';
import CustomInput from '../../components/CustomInput/CustomInput';

describe('Custom Input Tests', () => {
  it('Should render the component', () => {
    render(<CustomInput />);
  });

  it('Should change input value', async () => {
    render(<CustomInput value="Test" />);

    await screen.findByDisplayValue(/Test/);
  });
});
