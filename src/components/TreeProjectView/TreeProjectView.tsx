import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProjects } from '../../redux/project/project.slice';
import './styles.scss';
import { projectType } from 'core/types/api/project.requests.types';

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
  const projectsRedux = useSelector(selectProjects);
  const initialProjects: Array<projectTypeWithClassName> = getInitialProjects(projectsRedux);

  const [projects, setProjects] = useState<Array<projectTypeWithClassName>>(initialProjects);
  const [expanded, setExpanded] = useState<Array<string>>([]);

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

  return (
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
            label={project.name}
            className={project.className}
            onClick={() => {
              addSelectedClassName(project);
              setExpandedList(project);
            }}
          >
            {project.steps?.map((step: any) => {
              return <TreeItem key={step.id} nodeId={`${project.id}_${step.id}`} label={`${step.name}`} className="tree-item__task" />;
            })}
            <TreeItem
              nodeId={`${project.id}_Add`}
              label="Dodaj step"
              className="tree-item__step-add"
              onClick={() => {
                // Action
              }}
            />
          </TreeItem>
        );
      })}
    </TreeView>
  );
};

export default TreeProjectView;
