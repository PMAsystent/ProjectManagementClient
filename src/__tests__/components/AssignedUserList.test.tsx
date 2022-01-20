import React from 'react';
import { render, screen } from 'test-utils';
import AssignedUserList from '../../components/AssignedUsersList/AssignedUserList';
import { waitFor } from '@testing-library/react';

describe('Assigned User List Tests', () => {
  it('Should render the component', () => {
    render(<AssignedUserList users={[]} />);
  });

  it('Should render with provided users', async () => {
    render(
      <AssignedUserList
        includeCurrentUser={false}
        users={[
          {
            userId: 1,
            userName: 'johnDoe',
            email: 'johnDoe@gmail.com',
          },
          {
            userId: 2,
            userName: 'jackSparrow',
            email: 'jackSparrow@gmail.com',
          },
        ]}
      />
    );

    await waitFor(() => screen.getByText(/johnDoe/i));
    await waitFor(() => screen.getByText(/jackSparrow/i));
  });

  it('should display additional action (display userName) in user', async () => {
    render(
      <AssignedUserList
        addtionalActions={(user: any) => {
          return <div>{user?.email}</div>;
        }}
        users={[
          {
            userId: 1,
            userName: 'johnDoe',
            email: 'john@gmail.com',
          },
        ]}
      />
    );

    await waitFor(() => screen.getByText(/johnDoe/i));
    await waitFor(() => screen.getByText(/john@gmail.com/i));
  });
});
