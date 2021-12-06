import React from 'react';
import { render, screen } from 'test-utils';
import CustomTextArea from 'components/CustomTextArea/CustomTextArea';
import { fireEvent, waitFor } from '@testing-library/react';

describe('Custom Tesxt Area Tests', () => {
  it('Should render the component', () => {
    render(<CustomTextArea />);
  });
  it('should render the component with label', () => {
    render(<CustomTextArea label={'label'} />);
    screen.getByText(/label/i);
  });
  it('should render the component with value', async () => {
    const component = render(<CustomTextArea label={'label'} />);
    const textArea = component.container.querySelector('.textarea');
    if (textArea) {
      fireEvent.change(textArea, {
        target: { value: 'Test' },
      });
    }
    await waitFor(() => screen.getByDisplayValue(/Test/i));
  });
});
