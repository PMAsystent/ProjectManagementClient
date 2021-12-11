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
import { putTaskApi } from '../../api/utils';
import SnackbarUtils from '../../core/utils/SnackbarUtils';
import { selectAccessToken } from '../../redux/auth/auth.slice';
import CustomButton from '../../components/CustomButton/CustomButton';
import AddTaskModal from 'containers/AddTaskModal/AddTaskModal';

const ProjectDetails = () => {
  const [columns, setColumns] = useState<any>({
    1: {
      name: taskType.TODO,
      title: 'Do zrobienia',
      items: [],
    },
    2: {
      name: taskType.IN_PROGRESS,
      title: 'W trakcie',
      items: [],
    },
    3: {
      name: taskType.COMPLETED,
      title: 'Ukończone',
      items: [],
    },
  });
  const [activeTasks, setActiveTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const { projectid } = useParams<{ projectid: string }>();
  const projectDetails = useSelector(selectProjectDetails);
  const projectDetailsFetchStatus = useSelector(selectProjectDetailsFetchStatus);
  const accessToken = useSelector(selectAccessToken);
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
        handleOnClick: () => {
          setAddTaskModal(true);
        },
      },
    ],
    [history]
  );

  const onDragEnd = async (result: any, columns: any, setColumns: any) => {
    const task = projectDetails?.projectTasks.find((task) => task.id === +result.draggableId);

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
      if (task) {
        await putTaskApi({ ...task, description: 'test desc', taskStatus: destColumn.name }, accessToken || '').catch((error) => {
          destItems.splice(destination.index, 0, removed);
          setColumns({
            ...columns,
          });
          SnackbarUtils.error('Wsytąpił problem z aktualizacją');
        });
      }
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
    setActiveTasks(columns[`${1}`].items.length + columns[`${2}`].items.length);
    setCompletedTasks(columns[`${3}`].items.length);
  }, [columns]);

  useEffect(() => {
    dispatch(getProject(+projectid));
  }, [dispatch, projectid]);

  useEffect(() => {
    if (projectDetailsFetchStatus === fetchStatues.FULFILLED) {
      setColumns({
        1: {
          name: taskType.IN_PROGRESS,
          title: 'W trakcie',
          items: projectDetails?.projectTasks.filter((task) => task.taskStatus === taskType.IN_PROGRESS) || [],
        },
        2: {
          name: taskType.TODO,
          title: 'Do zrobienia',
          items: projectDetails?.projectTasks.filter((task) => task.taskStatus === taskType.TODO) || [],
        },
        3: {
          name: taskType.COMPLETED,
          title: 'Ukończone',
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
                <h3>{activeTasks}</h3>
              </div>
              <div className="info-item">
                <p>Ukończone Zadania</p>
                <h3>{completedTasks}</h3>
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
              <CustomButton icon={<PlaylistAddIcon />} className="btn-project" style={{ marginRight: 15 }}>
                Nowy Step
              </CustomButton>
              <CustomButton icon={<AddTaskIcon />} className="btn-project">
                Nowy Task
              </CustomButton>
              <div className="description">
                <p>Opis</p>
                <h3>{projectDetails?.description}</h3>
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
              {Object.entries(columns).map(([columnId, column]: any) => (
                <TaskList tasks={column?.items || []} key={columnId} name={column?.name || ''} title={column?.title || ''} prefix={columnId} />
              ))}
            </div>
          </DragDropContext>
        </>
      )}
      <BasicSpeedDial actions={actions} />
      {addTaskModal && <AddTaskModal open={addTaskModal} handleClose={() => setAddTaskModal(false)} />}
    </section>
  );
};

export default ProjectDetails;
