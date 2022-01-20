import { rest } from 'msw';

export const tasks = [
  rest.get(`/Tasks/1`, (req, res, ctx) => {
    return res(
      ctx.json({
        id: 16,
        name: 'Cradlepoint',
        description: 'Nowy opis',
        dueDate: '2022-02-04T22:00:00',
        isActive: false,
        progressPercentage: 40,
        created: '2022-01-13T23:45:58.1397124',
        projectSteps: [
          { id: 27, name: 'First step', progressPercentage: 50 },
          { id: 28, name: 'new step', progressPercentage: 0 },
        ],
        projectTasks: [
          {
            id: 29,
            name: 'New task',
            description: 'test desc',
            priority: 'high',
            taskStatus: 'Done',
            dueDate: '2022-02-04T22:00:00',
            progressPercentage: 100,
            stepId: 27,
          },
          {
            id: 30,
            name: 'asd',
            description: 'test desc',
            priority: 'medium',
            taskStatus: 'InProgress',
            dueDate: '2022-02-04T23:00:00',
            progressPercentage: 0,
            stepId: 27,
          },
          {
            id: 31,
            name: '1211',
            description: 'test desc',
            priority: 'low',
            taskStatus: 'InProgress',
            dueDate: '2022-02-04T23:00:00',
            progressPercentage: 0,
            stepId: 27,
          },
          {
            id: 32,
            name: 'asas',
            description: 'test desc',
            priority: 'medium',
            taskStatus: 'Done',
            dueDate: '2022-01-27T22:00:00',
            progressPercentage: 100,
            stepId: 27,
          },
          {
            id: 45,
            name: '222',
            description: 'dsadsads',
            priority: 'medium',
            taskStatus: 'ToDo',
            dueDate: '2022-02-04T20:00:00',
            progressPercentage: 0,
            stepId: 28,
          },
        ],
        projectAssignedUsers: [
          { userId: 18, userName: 'robert', memberType: 'Manager', projectRole: 'SuperMember' },
          { userId: 7, userName: 'qutasus', memberType: 'Developer', projectRole: 'Member' },
        ],
        currentUserInfoInProject: { memberType: 'Manager', projectRole: 'SuperMember' },
        projectCreator: { userId: 18, userName: 'robert' },
      })
    );
  }),
];
