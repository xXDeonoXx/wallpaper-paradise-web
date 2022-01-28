import React from 'react';
import Footer from './Footer';
import Header from './Header';

interface AdminPanelLayoutProps {
  currentRoute?: string;
  currentSubRoute?: string;
}

const AdminPanelLayout: React.FC<AdminPanelLayoutProps> = ({
  children,
  currentRoute,
  currentSubRoute,
}) => {
  return (
    <>
      <Header currentRoute={currentRoute} currentSubRoute={currentSubRoute} />
      <div className='h-screen'>{children}</div>
      <Footer />
    </>
  );
};

export default AdminPanelLayout;
