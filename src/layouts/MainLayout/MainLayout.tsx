import React, { FC, useState } from 'react';
import { Box } from '@mui/material';
import './styles.scss';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar';

const DashboardLayout: FC<any> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="dashboard-layout-root">
        <Box className="dashboard-layout-content">{children}</Box>
      </div>
      <Navbar onSidebarOpen={() => setSidebarOpen(true)} />
      <Sidebar open={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default DashboardLayout;
