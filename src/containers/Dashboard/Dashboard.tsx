import React, { useEffect, useMemo } from 'react';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, selectProjects, selectProjectsListFetchStatus } from 'redux/project/project.slice';
import { projectType } from 'core/types/api/project.requests.types';
import { clearProjectDetails } from '../../redux/project/project.slice';
// components
import FormProjectModal from 'containers/FormProjectModal/FormProjectModal';
import BasicSpeedDial from 'components/BasicSpeedDial/BasicSpeedDial';
import AddIcon from '@mui/icons-material/Add';
import ProjectTile from 'components/ProjectTile/ProjectTile';
import { fetchStates } from 'core/enums/redux.statues';
import AuthSpinner from 'components/AuthSpinner/AuthSpinner';
import { selectProjectSearch, selectWithArchive } from '../../redux/shared/shared.slice';

const MainLayout = () => {
  const dispatch = useDispatch();
  const searchProject = useSelector(selectProjectSearch);
  const withArchive = useSelector(selectWithArchive);
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
      {projectsListFetchStatus === fetchStates.FULFILLED &&
        (projects?.length ? (
          <>
            {projects
              .filter((project) => {
                const name = project.name.toUpperCase();
                const search = searchProject.toUpperCase();
                return name.includes(search);
              })
              .filter((project) => {
                if (withArchive) {
                  return true;
                }
                return project.isActive;
              })
              .map((project: projectType) => {
                const card = {
                  id: project.id,
                  name: project.name,
                  activeTasks: project.activeTasksCount,
                  progressBar: project.progressPercentage,
                  isActive: project.isActive,
                  endDate: project.dueDate,
                };
                return <ProjectTile {...card} key={project.id} />;
              })}
          </>
        ) : (
          <div className="no-projects">
            <h1>Nie znaleziono żadnego projektu</h1>
            <div className="add-new-project" onClick={() => setAddProjectModal(true)}>
              Dodaj nowy projekt <AddIcon />
            </div>
          </div>
        ))}
      {projectsListFetchStatus === fetchStates.REJECTED && <div>Some error</div>}
      {projectsListFetchStatus === fetchStates.PENDING && <AuthSpinner />}
      <BasicSpeedDial actions={actions} />
      {addProjectModal && <FormProjectModal open={addProjectModal} handleClose={() => setAddProjectModal(false)} />}
    </div>
  );
};

export default MainLayout;
