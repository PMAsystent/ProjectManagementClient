import React, { useEffect, useMemo } from 'react';
import './styles.scss';
import ProjectTile from '../../components/ProjectTile/ProjectTile';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, selectProjects } from 'redux/project/project.slice';
import { selectAccessToken } from '../../redux/auth/auth.slice';
import { projectType } from 'core/types/requests/project.types';
import AddProject from "../AddProject/AddProject";

const MainLayout = () => {
  const apiToken = useSelector(selectAccessToken);
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();
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
      <AddProject open={addProjectModal} handleClose={handleCloseAddProjectModal} />
    </div>
  );
};

export default MainLayout;
