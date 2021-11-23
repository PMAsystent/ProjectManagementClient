import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectProjects } from '../../redux/project/project.slice';

const TreeProjectView: FC<any> = () => {
  const projects = useSelector(selectProjects);

  return (
    <TreeView aria-label="Apps navigator" className="sidebar-tree" defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
      {projects?.map((project: any) => {
        return (
          <TreeItem key={project.id + '_0'} nodeId={project.id + '_0'} label={project.name}>
            {/*Steps here*/}
            <TreeItem nodeId={project.id + '_1'} label={`Tasks_${project.name}`} className="tree-item-task" />
          </TreeItem>
        );
      })}
    </TreeView>
  );
};

export default TreeProjectView;
