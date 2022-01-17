import React from 'react';
import Footer from './Footer';
import Header from './Header';

const AdminPanelLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default AdminPanelLayout;
