import React from 'react';
import Box from '@mui/material/Box';
import './styles.scss';
import ProjectTile from '../../components/ProjectTile/ProjectTile';

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
  return (
    <Box className="container">
      {cards.map((card, i) => {
        return <ProjectTile {...card} key={i} />;
      })}
    </Box>
  );
};

export default MainLayout;
