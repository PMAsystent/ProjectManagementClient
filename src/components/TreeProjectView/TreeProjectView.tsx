import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProjects } from '../../redux/project/project.slice';
import './styles.scss';
import { projectType } from 'core/types/api/project.requests.types';
import AddStepModal from '../../containers/AddStepModal/AddStepModal';
import { useHistory } from 'react-router-dom';
import { projectStep } from '../../core/types/api/step.request.types';

interface projectTypeWithClassName extends projectType {
  className: string;
}

const getInitialProjects = (projects: Array<projectType>): Array<projectTypeWithClassName> => {
  return projects.map((project) => {
    return {
      ...project,
      className: 'tree-item__project',
    };
  });
};

const TreeProjectView: FC<any> = () => {
  const history = useHistory();
  const projectsRedux = useSelector(selectProjects);
  const initialProjects: Array<projectTypeWithClassName> = getInitialProjects(projectsRedux);

  const [projects, setProjects] = useState<Array<projectTypeWithClassName>>(initialProjects);
  const [expanded, setExpanded] = useState<Array<string>>(['1']);
  const [addStepModal, setAddStepModal] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<number>(-1);

  const addSelectedClassName = (project: projectTypeWithClassName) => {
    const projectsCopy = initialProjects.map((project) => {
      return { ...project };
    });

    const selectedProject = projectsCopy.find((projectCopy: projectTypeWithClassName) => projectCopy.id === project.id);

    if (typeof selectedProject !== 'undefined') {
      selectedProject.className += ' selected-project';
    }

    setProjects(projectsCopy);
  };

  const setExpandedList = (project: projectType) => {
    setExpanded([`${project.id}`]);
  };

  const handleOnProjectClick = async (id: number) => {
    history.push(`/project/${id}`);
  };

  const handleOnStepClick = (projectTd: number, stepId: number) => {
    history.push(`/project/${projectTd}/${stepId}`);
  };

  return (
    <>
      <TreeView
        aria-label="Apps navigator"
        className="sidebar-tree"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
      >
        {projects?.map((project) => {
          return (
            <TreeItem
              key={project.id}
              nodeId={`${project.id}`}
              label={`${project.name}`}
              className={project.className}
              onClick={() => {
                setExpandedList(project);
                addSelectedClassName(project);
                handleOnProjectClick(project.id).then();
              }}
            >
              {project.steps?.map((step: projectStep) => {
                return (
                  <TreeItem
                    key={step.id}
                    nodeId={`${project.id}_${step.id}`}
                    label={`${step.name} (${step.progressPercentage}%)`}
                    className="tree-item__task"
                    onClick={() => {
                      handleOnStepClick(project.id, step.id);
                    }}
                  />
                );
              })}
              <TreeItem
                nodeId={`${project.id}_Add`}
                label="Dodaj step"
                className="tree-item__step-add"
                onClick={() => {
                  setProjectId(project.id);
                  setAddStepModal(true);
                }}
              />
            </TreeItem>
          );
        })}
      </TreeView>
      {addStepModal && <AddStepModal open={addStepModal} handleClose={() => setAddStepModal(false)} projectId={projectId} />}
    </>
  );
};

export default TreeProjectView;
