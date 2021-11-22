import React from 'react';
import './styles.scss';
import ProjectTile from '../../components/ProjectTile/ProjectTile';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, selectLoadingProjects, selectProjects } from 'redux/project/project.slice';
import { selectAccessToken } from '../../redux/auth/auth.slice';
import { myProjectsType } from 'core/types/requests/project.types';

const MainLayout = () => {
  const apiToken = useSelector(selectAccessToken);
  const entities: myProjectsType = useSelector(selectProjects);
  const loading = useSelector(selectLoadingProjects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects(apiToken));
  }, [apiToken, dispatch]);

  if (loading) return <p>Loading...</p>;

  const cards = entities.projectsList?.map((project: any) => {
    return {
      id: project.id,
      name: project.name,
      activeTasks: 26,
      progressBar: project.progressPercentage,
      typeOfProject: 'Aplikacja',
      endDate: project.dueDate,
    };
  });

  return (
    <div className="container">
      {cards ? (
        <>
          {cards.map((card: any, i: any) => {
            return <ProjectTile {...card} key={i} />;
          })}
        </>
      ) : (
        <b> No projects </b>
      )}
    </div>
  );
};

export default MainLayout;
