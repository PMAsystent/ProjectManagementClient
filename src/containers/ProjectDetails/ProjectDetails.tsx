import React, { useEffect, useMemo, useState } from 'react';
import './styles.scss';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import BasicSpeedDial from '../../components/BasicSpeedDial/BasicSpeedDial';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory, useParams } from 'react-router-dom';
import { getDashboardPath } from '../../core/routes';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { getProject, selectProjectDetails, selectProjectDetailsFetchStatus } from '../../redux/project/project.slice';
import { fetchStatues } from '../../core/enums/redux.statues';
import { Avatar, Stack } from '@mui/material';
import { stringToColor } from '../../core/utils';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskList from '../../components/TaskList/TaskList';
import { taskType } from '../../core/enums/task.type';
import { v4 as uuid } from 'uuid';

const ProjectDetails = () => {
  const [columns, setColumns] = useState<any>({
    [uuid()]: {
      name: taskType.IN_PROGRESS,
      items: [],
    },
    [uuid()]: {
      name: taskType.TODO,
      items: [],
    },
    [uuid()]: {
      name: taskType.COMPLETED,
      items: [],
    },
  });
  const { projectid } = useParams<{ projectid: string }>();
  const projectDetails = useSelector(selectProjectDetails);
  const projectDetailsFetchStatus = useSelector(selectProjectDetailsFetchStatus);
  const dispatch = useDispatch();
  const history = useHistory();
  const actions = useMemo(
    () => [
      {
        icon: <ArrowBackIcon />,
        name: 'Dashboard',
        handleOnClick: () => history.push(getDashboardPath),
      },
      {
        icon: <PlaylistAddIcon />,
        name: 'Dodaj nowy step',
        handleOnClick: () => {},
      },
      {
        icon: <AddTaskIcon />,
        name: 'Dodaj nowy task',
        handleOnClick: () => {},
      },
    ],
    [history]
  );

  const onDragEnd = (result: any, columns: any, setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  useEffect(() => {
    dispatch(getProject(+projectid));
  }, [dispatch, projectid]);

  useEffect(() => {
    if (projectDetailsFetchStatus === fetchStatues.FULFILLED) {
      setColumns({
        [uuid()]: {
          name: taskType.IN_PROGRESS,
          items: projectDetails?.projectTasks.filter((task) => task.taskStatus === taskType.IN_PROGRESS) || [],
        },
        [uuid()]: {
          name: taskType.TODO,
          items: projectDetails?.projectTasks.filter((task) => task.taskStatus === taskType.TODO) || [],
        },
        [uuid()]: {
          name: taskType.COMPLETED,
          items: projectDetails?.projectTasks.filter((task) => task.taskStatus === taskType.COMPLETED) || [],
        },
      });
    }
  }, [projectDetails?.projectTasks, projectDetailsFetchStatus]);

  return (
    <section className="project-container">
      {projectDetailsFetchStatus === fetchStatues.FULFILLED && (
        <>
          <div className="project-header">
            <div className="info">
              <h1>{projectDetails?.name}</h1>
              <div className="info-item">
                <p>Aktywne Zadania</p>
                <h3>0</h3>
              </div>
              <div className="info-item">
                <p>Ukończone Zadania</p>
                <h3>0</h3>
              </div>
              <div className="info-item">
                <p>Typ Projektu</p>
                <h3>Aplikacja</h3>
              </div>
              <div className="info-item">
                <p>Data Rozpoczęcia</p>
                <h3>{format(new Date(projectDetails?.created || Date.now()), 'dd.MM.yyyy')}</h3>
              </div>
              <div className="info-item">
                <p>Deadline</p>
                <h3>{format(new Date(projectDetails?.dueDate || Date.now()), 'dd.MM.yyyy')}</h3>
              </div>
              <div className="info-item">
                <p>Zespół</p>
                <Stack direction="row" spacing={1}>
                  {projectDetails?.projectAssignedUsers.map((user) => {
                    const { userName } = user;
                    return (
                      <Avatar key={userName} sx={{ bgcolor: stringToColor(userName) }}>
                        {userName[0].toUpperCase()}
                      </Avatar>
                    );
                  })}
                </Stack>
              </div>
            </div>
            <div className="circle">
              <CircularProgressbar
                styles={buildStyles({
                  backgroundColor: '#292929',
                })}
                background
                backgroundPadding={3}
                value={projectDetails?.progressPercentage || 0}
                text={`${projectDetails?.progressPercentage}%`}
              />
            </div>
          </div>
          <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
            <div className="project-tasks">
              {/*{lists.map((list) =>*/}
              {/*  list.prefix === taskType.IN_PROGRESS ? (*/}
              {/*    <TaskList tasks={activeTasks} key={list.id} name={list.name} prefix={list.prefix} />*/}
              {/*  ) : list.prefix === taskType.COMPLETED ? (*/}
              {/*    <TaskList tasks={completedTasks} key={list.id} name={list.name} prefix={list.prefix} />*/}
              {/*  ) : (*/}
              {/*    <TaskList tasks={todoTasks} key={list.id} name={list.name} prefix={list.prefix} />*/}
              {/*  )*/}
              {/*)}*/}
              {Object.entries(columns).map(([columnId, column]: any) => (
                <TaskList tasks={column?.items || []} key={columnId} name={column?.name || ''} prefix={columnId} />
              ))}
            </div>
          </DragDropContext>
        </>
      )}
      <BasicSpeedDial actions={actions} />
    </section>
  );
};

export default ProjectDetails;
