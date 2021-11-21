import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import './styles.scss';
import ProjectTile from '../../components/ProjectTile/ProjectTile';
import AddIcon from '@mui/icons-material/Add';
import BasicSpeedDial from '../../components/BasicSpeedDial/BasicSpeedDial';
import { useHistory } from 'react-router-dom';
import { getAddProjectPath } from '../../core/routes';
import AddProject from "../AddProject/AddProject";

const cards = [
  {
    id: 1,
    name: 'Aplikacja mobilna mbank',
    activeTasks: 26,
    progressBar: 76,
    typeOfProject: 'Aplikacja',
    endDate: '26.01.2022',
  },
  {
    id: 2,
    name: 'Aplikacja mobilna mbank',
    activeTasks: 26,
    progressBar: 76,
    typeOfProject: 'Aplikacja',
    endDate: '26.01.2022',
  },
  {
    id: 3,
    name: 'Aplikacja mobilna mbank',
    activeTasks: 26,
    progressBar: 76,
    typeOfProject: 'Aplikacja',
    endDate: '26.01.2022',
  },
  {
    id: 4,
    name: 'Aplikacja mobilna mbank',
    activeTasks: 26,
    progressBar: 76,
    typeOfProject: 'Aplikacja',
    endDate: '26.01.2022',
  },
];

const MainLayout = () => {
  const [addProjectModal, setAddProjectModal] = React.useState(false);
  const handleOpenAddProjectModal = () => setAddProjectModal(true);
  const handleCloseAddProjectModal = () => setAddProjectModal(false);
  const actions = useMemo(
    () => [
      {
        icon: <AddIcon />,
        name: 'Dodaj nowy projekt',
        handleOnClick: () => handleOpenAddProjectModal(),
      },
    ],
    []
  );

  return (
    <Box className="dashboard-layout-content">
      <Box className="container">
        {cards.map((card, i) => {
          return <ProjectTile {...card} key={i} />;
        })}
        <BasicSpeedDial actions={actions} />
        <AddProject open={addProjectModal} handleClose={handleCloseAddProjectModal} />
      </Box>
    </Box>
  );
};

export default MainLayout;
