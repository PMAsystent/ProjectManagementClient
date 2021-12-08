import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectProjects } from '../../redux/project/project.slice';
import './styles.scss';

const TreeProjectView: FC<any> = () => {
  const projects = useSelector(selectProjects);

  return (
    <TreeView aria-label="Apps navigator" className="sidebar-tree" defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
      {projects?.map((project: any) => {
        return (
          <TreeItem key={project.id} nodeId={project.id} label={project.name} className="tree-item tree-item__project">
            {project.steps?.map((step: any) => {
              return <TreeItem key={step.id} nodeId={`${project.id}_${step.id}`} label={`${step.name}`} className="tree-item tree-item__task" />;
            })}
            <TreeItem
              nodeId={`${project.id}_Add`}
              label="Dodaj step"
              className="tree-item tree-item__step-add"
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
