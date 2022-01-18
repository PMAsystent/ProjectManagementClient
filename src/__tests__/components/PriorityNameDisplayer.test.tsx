import { render, screen } from '../../test-utils';
import React from 'react';
import PriorityNameDisplayer from '../../components/PriorityNameDisplayer/PriorityNameDisplayer';
import FormTaskModal from '../../containers/FormTaskModal/FormTaskModal';

describe('Priority Name Modal Tests', () => {
  let open: boolean;
  let handleOnClose: any;
  beforeEach(() => {
    open = true;
    handleOnClose = () => {
      open = false;
    };
  });

  it('Should render the component', () => {
    render(
      <FormTaskModal open={open} handleClose={handleOnClose} stepId={1} projectId={1}>
        <PriorityNameDisplayer priorityFieldName={'1'} />
      </FormTaskModal>
    );
    screen.getByText('NISKI');
  });
});
