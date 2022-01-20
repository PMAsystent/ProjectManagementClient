import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProjectDetails, selectProjects } from 'redux/project/project.slice';
import './styles.scss';
import { projectType } from 'core/types/api/project.requests.types';
import FormStepModal from 'containers/FormStepModal/FormStepModal';
import { useHistory } from 'react-router-dom';
import { projectStep } from 'core/types/api/step.request.types';
import VisibilityGuard from 'core/hoc/VisibilityGuard';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import {
  clearDeleteStepFetchStatus,
  clearPostStepFetchStatus,
  clearPutStepFetchStatus,
  deleteStep,
  selectDeleteStepFetchStatus,
  selectPostStepFetchStatus,
  selectPutStepFetchStatus,
} from '../../redux/step/step.slice';
import useRedirectOnDoneFetchStatus from '../../core/hooks/useRedirectOnDoneFetchStatus';
import { selectProjectSearch, selectWithArchive } from '../../redux/shared/shared.slice';

const TreeProjectView: FC<any> = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const projectsRedux = useSelector(selectProjects);
  const projectDetails = useSelector(selectProjectDetails);
  const deleteStepFetchStatus = useSelector(selectDeleteStepFetchStatus);
  const postStepFetchStatus = useSelector(selectPostStepFetchStatus);
  const putStepFetchStatus = useSelector(selectPutStepFetchStatus);
  const searchProject = useSelector(selectProjectSearch);
  const withArchive = useSelector(selectWithArchive);

  const [selectedStep, setSelectedStep] = useState<any>(null);
  const [addStepModal, setAddStepModal] = useState<boolean>(false);
  const [editStepModal, setEditStepModal] = useState<boolean>(false);
  const [deleteStepModal, setDeleteStepModal] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<number>(-1);

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

  useRedirectOnDoneFetchStatus({
    status: postStepFetchStatus,
    path: `/project/${projectDetails?.id}`,
    clearFunction: clearPostStepFetchStatus,
  });

  useRedirectOnDoneFetchStatus({
    status: putStepFetchStatus,
    path: `/project/${projectDetails?.id}`,
    clearFunction: clearPutStepFetchStatus,
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
        {projectsRedux
          ?.filter((project) => {
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
          .map((project) => {
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
                          {project?.isActive && (
                            <>
                              <EditIcon id="edit-step" />
                              <DeleteIcon id="delete-step" />
                            </>
                          )}
                        </VisibilityGuard>
                      }
                      className="tree-item__task"
                      onClick={(e: any) => {
                        setSelectedStep(step);
                        if (e.target?.id) {
                          if (e.target.id === 'edit-step') {
                            setEditStepModal(true);
                          }
                          if (e.target.id === 'delete-step') {
                            setDeleteStepModal(true);
                          }
                        } else if (e.target?.parentNode?.id) {
                          if (e.target.parentNode.id === 'edit-step') {
                            setEditStepModal(true);
                          }
                          if (e.target.parentNode.id === 'delete-step') {
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
                  {project?.isActive && (
                    <TreeItem
                      nodeId={`${project.id}_Add`}
                      label="Dodaj step"
                      className="tree-item__step-add"
                      onClick={() => {
                        setProjectId(project.id);
                        setAddStepModal(true);
                      }}
                    />
                  )}
                </VisibilityGuard>
              </TreeItem>
            );
          })}
      </TreeView>
      {addStepModal && <FormStepModal open={addStepModal} handleClose={() => setAddStepModal(false)} projectId={projectId} />}
      {editStepModal && <FormStepModal open={editStepModal} handleClose={() => setEditStepModal(false)} projectId={projectId} step={selectedStep} />}
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
