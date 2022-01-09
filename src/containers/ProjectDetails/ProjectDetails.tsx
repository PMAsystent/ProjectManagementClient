import React, { useEffect, useMemo, useState } from 'react';
import './styles.scss';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import BasicSpeedDial from 'components/BasicSpeedDial/BasicSpeedDial';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory, useParams } from 'react-router-dom';
import { getDashboardPath } from 'core/routes';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import {
  archiveProject,
  clearProjectArchiveFetchStatus,
  clearProjectDeleteFetchStatus,
  deleteProject,
  getProject,
  selectProjectArchiveFetchStatus,
  selectProjectDeleteFetchStatus,
  selectProjectDetails,
  selectProjectDetailsFetchStatus,
  setProjectProgressPercentage,
} from 'redux/project/project.slice';
import { fetchStates } from 'core/enums/redux.statues';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskList from 'components/TaskList/TaskList';
import { taskType } from 'core/enums/task.type';
import { getProjectApi, putTaskApi } from 'api/utils';
import SnackbarUtils from 'core/utils/SnackbarUtils';
import { selectAccessToken, selectUser } from 'redux/auth/auth.slice';
import CustomButton from 'components/CustomButton/CustomButton';
import AvatarList from 'components/AvatarList/AvatarList';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import FormProjectModal from '../FormProjectModal/FormProjectModal';
import { projectStep } from 'core/types/api/step.request.types';
import FormTaskModal from 'containers/FormTaskModal/FormTaskModal';
import VisibilityGuard from 'core/hoc/VisibilityGuard';
import { projectRoleEnum } from '../../core/enums/project.role';
import FormStepModal from '../FormStepModal/FormStepModal';
import { projectPutTaskType } from '../../core/types/api/task.request.types';
import { Tooltip } from '@mui/material';
import useRedirectOnDoneFetchStatus from '../../core/hooks/useRedirectOnDoneFetchStatus';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import { selectTaskSearch } from '../../redux/shared/shared.slice';

const ProjectDetails = () => {
  const [step, setStep] = useState<null | projectStep>(null);
  const [deleteProjectModal, setDeleteProjectModal] = useState<boolean>(false);
  const [archiveProjectModal, setArchiveProjectModal] = useState<boolean>(false);
  const [editProjectModal, setEditProjectModal] = useState(false);
  const [addStepModal, setAddStepModal] = useState<boolean>(false);
  const [activeTasks, setActiveTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const projectDetails = useSelector(selectProjectDetails);
  const { projectid, stepid } = useParams<{ projectid: string; stepid: string }>();
  const projectDetailsFetchStatus = useSelector(selectProjectDetailsFetchStatus);
  const projectDeleteFetchStatus = useSelector(selectProjectDeleteFetchStatus);
  const projectArchiveFetchStatus = useSelector(selectProjectArchiveFetchStatus);
  const searchTask = useSelector(selectTaskSearch);
  const accessToken = useSelector(selectAccessToken);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();
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
  const actions = useMemo(() => {
    const actionsArray = [
      {
        icon: <ArrowBackIcon />,
        name: 'Dashboard',
        handleOnClick: () => history.push(getDashboardPath),
      },
    ];
    if (projectDetails?.currentUserInfoInProject?.projectRole === projectRoleEnum.SUPER_MEMBER.value) {
      actionsArray.push({
        icon: <PlaylistAddIcon />,
        name: 'Dodaj nowy step',
        handleOnClick: () => setAddStepModal(true),
      });
    }

    if (stepid) {
      actionsArray.push({
        icon: <AddTaskIcon />,
        name: 'Dodaj nowy task',
        handleOnClick: () => {
          setAddTaskModal(true);
        },
      });
    }
    return actionsArray;
  }, [history, projectDetails?.currentUserInfoInProject?.projectRole, stepid]);

  const handleArchiveProject = () => {
    dispatch(archiveProject({ id: +projectid, isActive: false }));
  };

  const handleDeleteProject = () => {
    dispatch(deleteProject(+projectid));
  };

  const handleCloseDeleteProject = (success: boolean) => {
    setDeleteProjectModal(false);
    if (success) {
      handleDeleteProject();
    }
  };

  const handleCloseArchiveProject = (success: boolean) => {
    setArchiveProjectModal(false);
    if (success) {
      handleArchiveProject();
    }
  };

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
        await putTaskApi(
          {
            ...task,
            description: 'test desc',
            taskStatus: destColumn.name,
          },
          accessToken || ''
        )
          .then(async (response) => {
            const result = await getProjectApi(+projectid, accessToken);
            if (result.data) {
              dispatch(setProjectProgressPercentage(result.data.progressPercentage));
            }
          })
          .catch((error) => {
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
    if (projectDetailsFetchStatus === fetchStates.FULFILLED) {
      let todoTasks: Array<projectPutTaskType> = [];
      let inProgressTasks: Array<projectPutTaskType> = [];
      let completedTasks: Array<projectPutTaskType> = [];

      if (stepid && projectDetails?.projectSteps && projectDetails.projectSteps.length > 0) {
        setStep(projectDetails.projectSteps.find((step) => step.id === +stepid) || null);
        todoTasks = projectDetails?.projectTasks.filter((task) => task.taskStatus === taskType.TODO && task.stepId === +stepid) || [];
        inProgressTasks = projectDetails?.projectTasks.filter((task) => task.taskStatus === taskType.IN_PROGRESS && task.stepId === +stepid) || [];
        completedTasks = projectDetails?.projectTasks.filter((task) => task.taskStatus === taskType.COMPLETED && task.stepId === +stepid) || [];
      }
      if (!stepid) {
        setStep(null);
        todoTasks = projectDetails?.projectTasks.filter((task) => task.taskStatus === taskType.TODO) || [];
        inProgressTasks = projectDetails?.projectTasks.filter((task) => task.taskStatus === taskType.IN_PROGRESS) || [];
        completedTasks = projectDetails?.projectTasks.filter((task) => task.taskStatus === taskType.COMPLETED) || [];
      }

      setColumns({
        1: {
          name: taskType.TODO,
          title: 'Do zrobienia',
          items: todoTasks,
        },
        2: {
          name: taskType.IN_PROGRESS,
          title: 'W trakcie',
          items: inProgressTasks,
        },
        3: {
          name: taskType.COMPLETED,
          title: 'Ukończone',
          items: completedTasks,
        },
      });
    }
  }, [projectDetails?.projectSteps, projectDetails?.projectTasks, projectDetailsFetchStatus, stepid]);

  useRedirectOnDoneFetchStatus({ status: projectArchiveFetchStatus, path: getDashboardPath, clearFunction: clearProjectArchiveFetchStatus });
  useRedirectOnDoneFetchStatus({ status: projectDeleteFetchStatus, path: getDashboardPath, clearFunction: clearProjectDeleteFetchStatus });

  return (
    <section className="project-container">
      {projectDetailsFetchStatus === fetchStates.FULFILLED && (
        <>
          <div className="project-header">
            <div className="info">
              <div className="header-item">
                <h1>
                  {projectDetails?.name} {step?.name && `- ${step.name}`}
                </h1>
                <VisibilityGuard member={projectDetails?.currentUserInfoInProject?.projectRole || ''}>
                  <Tooltip title="Edycja Projektu">
                    <EditIcon onClick={() => setEditProjectModal(true)} />
                  </Tooltip>
                  <Tooltip title="Zarchiwizuj Projekt">
                    <ArchiveIcon onClick={() => setArchiveProjectModal(true)} />
                  </Tooltip>
                  {projectDetails?.projectCreator && projectDetails?.projectCreator.userId === user?.userId && (
                    <Tooltip title="Usuń Projekt">
                      <DeleteIcon onClick={() => setDeleteProjectModal(true)} />
                    </Tooltip>
                  )}
                </VisibilityGuard>
              </div>
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
              <div className="info-item team">
                <p>Zespół</p>
                <AvatarList member={projectDetails?.currentUserInfoInProject?.projectRole || ''} users={projectDetails?.projectAssignedUsers || []} />
              </div>
              <div className="info-item">
                <VisibilityGuard member={projectDetails?.currentUserInfoInProject?.projectRole || ''}>
                  <CustomButton onClick={() => setAddStepModal(true)} icon={<PlaylistAddIcon />} className="btn-project" style={{ marginRight: 15 }}>
                    Nowy Step
                  </CustomButton>
                </VisibilityGuard>
                {stepid && (
                  <CustomButton onClick={() => setAddTaskModal(true)} icon={<AddTaskIcon />} className="btn-project">
                    Nowy Task
                  </CustomButton>
                )}
              </div>
              <div className="info-item description">
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
                <TaskList
                  tasks={
                    column?.items.filter((item: any) => {
                      const name = item.name.toUpperCase();
                      const search = searchTask.toUpperCase();
                      return name.includes(search);
                    }) || []
                  }
                  key={columnId}
                  name={column?.name || ''}
                  title={column?.title || ''}
                  prefix={columnId}
                />
              ))}
            </div>
          </DragDropContext>
        </>
      )}
      <BasicSpeedDial actions={actions} />
      {addStepModal && <FormStepModal open={addStepModal} handleClose={() => setAddStepModal(false)} projectId={projectid} />}
      {deleteProjectModal && (
        <ConfirmationModal
          title={'Usuwanie Projektu'}
          text={`Czy napewno chcesz usunąć ${projectDetails?.name}?`}
          open={deleteProjectModal}
          handleClose={handleCloseDeleteProject}
        />
      )}
      {archiveProjectModal && (
        <ConfirmationModal
          title={'Archiwizowanie Projektu'}
          text={`Czy napewno chcesz zarchiwizować ${projectDetails?.name}?`}
          open={archiveProjectModal}
          handleClose={handleCloseArchiveProject}
        />
      )}
      {addTaskModal && (
        <FormTaskModal
          open={addTaskModal}
          handleClose={() => {
            setAddTaskModal(false);
          }}
          stepId={stepid}
        />
      )}
      {editProjectModal && projectDetails && (
        <FormProjectModal
          project={{
            id: projectDetails.id,
            name: projectDetails.name,
            description: projectDetails.description,
            dueDate: projectDetails.dueDate,
          }}
          open={editProjectModal}
          handleClose={() => setEditProjectModal(false)}
        />
      )}
    </section>
  );
};

export default ProjectDetails;
