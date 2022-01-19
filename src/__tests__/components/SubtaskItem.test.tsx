import { render, screen } from '../../test-utils';
import React from 'react';
import SubtaskItem from '../../components/SubtaskItem/SubtaskItem';

describe('SubTask View Tests', () => {
  it('Should render the component', () => {
    render(
      <SubtaskItem
        enabledSubtaskId={0}
        onSubtaskDelete={() => {}}
        setEnabledSubtaskId={() => {}}
        onSubtaskStateChange={() => {}}
        subtask={{
          id: 0,
          name: 'string',
          isDone: true,
          taskId: 15,
        }}
      />
    );
    screen.getAllByTestId('DeleteIcon');
  });
});
