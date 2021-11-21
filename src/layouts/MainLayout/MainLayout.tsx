import React, { FC, useState } from 'react';
import './styles.scss';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar';

const DashboardLayout: FC<any> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="main-layout-root">{children}</div>
      <Navbar onSidebarOpen={() => setSidebarOpen(true)} />
      <Sidebar open={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default DashboardLayout;
