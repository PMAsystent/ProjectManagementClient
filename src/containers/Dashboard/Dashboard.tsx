import React, { useEffect, useMemo } from 'react';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, selectProjects, selectProjectsListFetchStatus } from 'redux/project/project.slice';
import { projectType } from 'core/types/api/project.requests.types';
import { clearProjectDetails } from '../../redux/project/project.slice';
// components
import AddProjectModal from 'containers/AddProjectModal/AddProjectModal';
import BasicSpeedDial from 'components/BasicSpeedDial/BasicSpeedDial';
import AddIcon from '@mui/icons-material/Add';
import ProjectTile from 'components/ProjectTile/ProjectTile';
import { fetchStatues } from 'core/enums/redux.statues';
import AuthSpinner from 'components/AuthSpinner/AuthSpinner';

const MainLayout = () => {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const projectsListFetchStatus = useSelector(selectProjectsListFetchStatus);
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
    dispatch(clearProjectDetails());
    dispatch(getProjects());
  }, [dispatch]);
  return (
    <div className="container">
      {projectsListFetchStatus === fetchStatues.FULFILLED &&
        (projects?.length ? (
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
        ))}
      {projectsListFetchStatus === fetchStatues.REJECTED && <div>Some error</div>}
      {projectsListFetchStatus === fetchStatues.PENDING && <AuthSpinner />}
      <BasicSpeedDial actions={actions} />
      {addProjectModal && <AddProjectModal open={addProjectModal} handleClose={() => setAddProjectModal(false)} />}
    </div>
  );
};

export default MainLayout;
