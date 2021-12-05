import React from 'react';
import { render } from 'test-utils';
import AddProject from 'containers/AddProject/AddProject';

describe('Add Project Modal Tests', () => {
  it('should render the component', () => {
    render(<AddProject />);
  });
});
