import React, { useEffect, useMemo } from 'react';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, selectProjects } from 'redux/project/project.slice';
import { selectAccessToken } from '../../redux/auth/auth.slice';
import { projectType } from 'core/types/requests/project.types';
// components
import AddProject from 'containers/AddProject/AddProject';
import BasicSpeedDial from 'components/BasicSpeedDial/BasicSpeedDial';
import AddIcon from '@mui/icons-material/Add';
import ProjectTile from '../../components/ProjectTile/ProjectTile';

const MainLayout = () => {
  const dispatch = useDispatch();
  const apiToken = useSelector(selectAccessToken);
  const projects = useSelector(selectProjects);
  const [addProjectModal, setAddProjectModal] = React.useState(false);
  const actions = useMemo(
    () => [
      {
        icon: <AddIcon />,
        name: 'Dodaj nowy projekt',
        handleOnClick: () => setAddProjectModal(true),
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(getProjects(apiToken));
  }, [apiToken, dispatch]);

  return (
    <div className="container">
      {projects?.length ? (
        <>
          {projects.map((project: projectType) => {
            const card = {
              id: project.id,
              name: project.name,
              activeTasks: 26,
              progressBar: project.progressPercentage,
              typeOfProject: 'Aplikacja',
              endDate: project.dueDate,
            };
            return <ProjectTile {...card} key={project.id} />;
          })}
        </>
      ) : (
        <h1> No projects </h1>
      )}
      <BasicSpeedDial actions={actions} />
      <AddProject open={addProjectModal} handleClose={() => setAddProjectModal(false)} />
    </div>
  );
};

export default MainLayout;
