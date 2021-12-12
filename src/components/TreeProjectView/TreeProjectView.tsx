import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProjects } from '../../redux/project/project.slice';
import './styles.scss';

const TreeProjectView: FC<any> = () => {
  const projects = useSelector(selectProjects);
  const initialProjects: Array<any> = projects.map((project: any) => {
    const steps = project.steps.map((step: any) => {
      return {
        id: step.id,
        name: step.name,
      };
    });

    return {
      id: project.id,
      name: project.name,
      steps: steps,
      className: 'tree-item__project',
    };
  });
  const [objects, setObjects] = useState<Array<any>>(initialProjects);
  const [expanded, setExpanded] = useState<Array<string>>([]);

  const handleClick = (project: any) => {
    const projectsCopy = initialProjects.map((a) => {
      return { ...a };
    });

    projectsCopy.find((projectCopy) => projectCopy.id === project.id).className += ' selected-project';
    setObjects(projectsCopy);
  };

  const expandedClick = (project: any) => {
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
      {objects?.map((project: any) => {
        return (
          <TreeItem
            key={project.id}
            nodeId={`${project.id}`}
            label={project.name}
            className={project.className}
            onClick={() => {
              handleClick(project);
              expandedClick(project);
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
