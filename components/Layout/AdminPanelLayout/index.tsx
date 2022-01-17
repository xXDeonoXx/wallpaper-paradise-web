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
      {children}
      <Footer />
    </>
  );
};

export default AdminPanelLayout;
