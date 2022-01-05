import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProjectDetails, selectProjects } from 'redux/project/project.slice';
import './styles.scss';
import { projectType } from 'core/types/api/project.requests.types';
import AddStepModal from 'containers/AddStepModal/AddStepModal';
import { useHistory } from 'react-router-dom';
import { projectStep } from 'core/types/api/step.request.types';
import VisibilityGuard from 'core/hoc/VisibilityGuard';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { clearDeleteStepFetchStatus, deleteStep, selectDeleteStepFetchStatus } from '../../redux/step/step.slice';
import useRedirectOnDoneFetchStatus from '../../core/hooks/useRedirectOnDoneFetchStatus';
import { getProjectDetailsPath } from '../../core/routes';

const TreeProjectView: FC<any> = () => {
  const history = useHistory();
  const projectsRedux = useSelector(selectProjects);
  const projectDetails = useSelector(selectProjectDetails);

  const [selectedStep, setSelectedStep] = useState<any>(null);
  const [addStepModal, setAddStepModal] = useState<boolean>(false);
  const [deleteStepModal, setDeleteStepModal] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<number>(-1);
  const dispatch = useDispatch();
  const deleteStepFetchStatus = useSelector(selectDeleteStepFetchStatus);

  const goToProjectDetails = (projectId: any, stepId?: any) => {
    history.push(`/project/${projectId}/${stepId || ''}`);
  };

  const handleCloseDeleteStep = (success: boolean) => {
    setDeleteStepModal(false);
    if (success) {
      dispatch(deleteStep(selectedStep.id));
    }
  };

  const getClassName = (project: projectType) => {
    let result = 'tree-item__project';

    if (project.id === projectDetails?.id) {
      result += ' selected-project';
    }

    return result;
  };

  useRedirectOnDoneFetchStatus({
    status: deleteStepFetchStatus,
    path: `/project/${projectDetails?.id}`,
    clearFunction: clearDeleteStepFetchStatus,
  });

  return (
    <>
      <TreeView
        aria-label="Apps navigator"
        className="sidebar-tree"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={[`${projectDetails?.id}`]}
      >
        {projectsRedux?.map((project) => {
          return (
            <TreeItem
              key={project.id}
              nodeId={`${project.id}`}
              label={`${project.name}`}
              className={getClassName(project)}
              onClick={() => {
                goToProjectDetails(project.id);
              }}
            >
              {project.steps?.map((step: projectStep) => {
                return (
                  <TreeItem
                    key={step.id}
                    nodeId={`${project.id}_${step.id}`}
                    label={`${step.name} (${step.progressPercentage}%)`}
                    icon={
                      <VisibilityGuard member={projectDetails?.currentUserInfoInProject?.projectRole || ''}>
                        <EditIcon id="edit" />
                        <DeleteIcon id="delete" />
                      </VisibilityGuard>
                    }
                    className="tree-item__task"
                    onClick={(e: any) => {
                      setSelectedStep(step);
                      if (e.target?.id) {
                        if (e.target.id === 'edit') {
                          // TODO: edit step
                        }
                        if (e.target.id === 'delete') {
                          setDeleteStepModal(true);
                        }
                      } else if (e.target?.parentNode?.id) {
                        if (e.target.parentNode.id === 'edit') {
                          // TODO: edit step
                        }
                        if (e.target.parentNode.id === 'delete') {
                          setDeleteStepModal(true);
                        }
                      } else {
                        goToProjectDetails(project.id, step.id);
                      }
                    }}
                  />
                );
              })}
              <VisibilityGuard member={projectDetails?.currentUserInfoInProject?.projectRole || ''}>
                <TreeItem
                  nodeId={`${project.id}_Add`}
                  label="Dodaj step"
                  className="tree-item__step-add"
                  onClick={() => {
                    setProjectId(project.id);
                    setAddStepModal(true);
                  }}
                />
              </VisibilityGuard>
            </TreeItem>
          );
        })}
      </TreeView>
      {addStepModal && <AddStepModal open={addStepModal} handleClose={() => setAddStepModal(false)} projectId={projectId} />}
      {deleteStepModal && selectedStep && (
        <ConfirmationModal
          text={`Czy napewno chcesz usunąć ${selectedStep?.name}?`}
          title={'Usuwanie Stepu'}
          open={deleteStepModal}
          handleClose={handleCloseDeleteStep}
        />
      )}
    </>
  );
};

export default TreeProjectView;
