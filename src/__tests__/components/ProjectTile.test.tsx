import React from 'react';
import { render, screen } from 'test-utils';
import ProjectTile from 'components/ProjectTile/ProjectTile';

const project = {
  name: 'Test',
  activeTasks: 20,
  progressBar: 50,
  typeOfProject: 'App',
  endDate: '2021-12-03 16:49:09.8983084',
};

describe('Project Tile Tests', () => {
  it('Should render the component', () => {
    render(<ProjectTile {...project} />);
  });
  it('Should render correct data check', () => {
    render(<ProjectTile {...project} />);

    screen.getByText(/App/i);
    screen.getByText(/50%/i);
    screen.getByText(/Test/i);
    screen.getByText('20');
    screen.getByText(/03.12.2021/i);
  });
});
