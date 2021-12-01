import React, { useMemo } from 'react';
import './styles.scss';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import BasicSpeedDial from '../../components/BasicSpeedDial/BasicSpeedDial';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';
import { getDashboardPath } from '../../core/routes';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { format } from 'date-fns';

const ProjectDetails = () => {
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
    []
  );

  return (
    <section className="project-container">
      <div className="project-header">
        <div className="info">
          <h1>Aplikacja Mobilna MBank</h1>
          <div>
            <p>Aktywne Zadania</p>
            <h3>26</h3>
          </div>
          <div>
            <p>Ukończone Zadania</p>
            <h3>45</h3>
          </div>
          <div>
            <p>Typ Projektu</p>
            <h3>Aplikacja</h3>
          </div>
          <div>
            <p>Data Rozpoczęcia</p>
            <h3>{format(Date.now(), 'dd.MM.yyyy')}</h3>
          </div>
          <div>
            <p>Deadline</p>
            <h3>{format(Date.now(), 'dd.MM.yyyy')}</h3>
          </div>
          <div>
            <p>Zespół</p>
            <h3>icony</h3>
          </div>
        </div>
        <div className="circle">
          <CircularProgressbar
            styles={buildStyles({
              backgroundColor: '#292929',
            })}
            background
            backgroundPadding={3}
            value={75}
            text={`${75}%`}
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
      <BasicSpeedDial actions={actions} />
    </section>
  );
};

export default ProjectDetails;
