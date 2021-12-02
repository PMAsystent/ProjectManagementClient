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

const ProjectDetails = () => {
  const [activeTasks, setActiveTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
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

  useEffect(() => {
    dispatch(getProject(+projectid));
  }, [dispatch, projectid]);

  useEffect(() => {
    if (projectDetailsFetchStatus === fetchStatues.FULFILLED) {
      setActiveTasks(1);
      setCompletedTasks(1);
    }
  }, [projectDetailsFetchStatus]);

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
            </div>
            <div className="circle">
              <CircularProgressbar
                styles={buildStyles({
                  backgroundColor: '#292929',
                })}
                background
                backgroundPadding={projectDetails?.progressPercentage}
                value={projectDetails?.progressPercentage || 0}
                text={`${projectDetails?.progressPercentage}%`}
              />
            </div>
          </div>
          <div className="project-tasks">
            <div className="tasks-container">
              <h1>Nierozpoczęte</h1>
              <div className="tasks-drop"></div>
            </div>
            <div className="tasks-container">
              <h1>W Trakcie</h1>
              <div className="tasks-drop"></div>
            </div>
            <div className="tasks-container">
              <h1>Ukończone</h1>
              <div className="tasks-drop"></div>
            </div>
          </div>
        </>
      )}
      <BasicSpeedDial actions={actions} />
    </section>
  );
};

export default ProjectDetails;
