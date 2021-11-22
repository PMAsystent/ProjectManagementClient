import React, { useEffect } from 'react';
import './styles.scss';
import ProjectTile from '../../components/ProjectTile/ProjectTile';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, selectLoadingProjects, selectProjects } from 'redux/project/project.slice';
import { selectAccessToken } from '../../redux/auth/auth.slice';
import { projectType } from 'core/types/requests/project.types';

const MainLayout = () => {
  const apiToken = useSelector(selectAccessToken);
  const entities = useSelector(selectProjects);
  const loading = useSelector(selectLoadingProjects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects(apiToken));
  }, [apiToken, dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      {entities.length ? (
        <>
          {entities.map((project: projectType) => {
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
    </div>
  );
};

export default MainLayout;
