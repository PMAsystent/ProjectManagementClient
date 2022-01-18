import { fireEvent, render, screen } from '../../test-utils';
import React from 'react';
import PriorityPicker from '../../components/PriorityPicker/PriorityPicker';
import { waitFor } from '@testing-library/react';

describe('Confirmation Modal Tests', () => {
  let value: number;
  let onChange: any;
  beforeEach(() => {
    value = 5;
    onChange = (e: any) => {
      value = e;
    };
  });

  it('Should render the component', () => {
    render(<PriorityPicker value={value} onChange={onChange} />);
    const circle = screen.getAllByTestId(/active/);
    expect(circle.length).toEqual(value);
  });

  it('Should render the component - onchange', async () => {
    render(<PriorityPicker value={value} onChange={onChange} />);
    let circle = screen.getAllByTestId(/active/);
    fireEvent.click(circle[0]);
    await waitFor(() => {
      circle = screen.getAllByTestId(/active/);
      expect(circle.length).toEqual(1);
    });
  });
});
