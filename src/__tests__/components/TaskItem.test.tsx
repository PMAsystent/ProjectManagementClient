import { render, screen } from '../../test-utils';
import React from 'react';
import TaskItem from '../../components/TaskItem/TaskItem';
import { fireEvent } from '@testing-library/react';

describe('Task Item Tests', () => {
  const task = {
    id: 1,
    name: 'string',
    priority: 'low',
    taskStatus: 'low',
    dueDate: '12/03/2022',
    stepId: '',
    assignedUser: [],
    subtasks: [],
    description: '',
    progressPercentage: 100,
  };

  it('Should render the component', () => {
    render(<TaskItem task={task} />);
    screen.getByText('03.12.2022');
    screen.getByText(/string/);
    screen.getByText(/100%/);
  });

  it('Should show modal', () => {
    render(<TaskItem task={task} />);
    fireEvent.click(screen.getByText(/string/));
    screen.getByText(/string - Edycja/);
  });
});
