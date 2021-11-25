import { render, screen } from '../../test-utils';
import React from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import { RiArrowGoBackLine } from 'react-icons/ri';

describe('Custom Button Tests', () => {
  it('Should render the component', () => {
    render(<CustomButton>Test</CustomButton>);
    screen.getByText('Test');
  });

  it('Should render pending button status', () => {
    render(<CustomButton status="pending" />);
    screen.getAllByRole('progressbar');
  });

  it('Should render icon', () => {
    render(<CustomButton icon={<RiArrowGoBackLine role="img" />} />);
    screen.getByRole('img');
  });
});
