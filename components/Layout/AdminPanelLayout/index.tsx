import React from 'react';
import Footer from './Footer';
import Header from './Header';

interface AdminPanelLayoutProps {
  currentRoute?: string;
  currentSubRoute?: string;
  title?: string;
}

const AdminPanelLayout: React.FC<AdminPanelLayoutProps> = ({
  children,
  currentRoute,
  currentSubRoute,
  title,
}) => {
  return (
    <>
      <Header currentRoute={currentRoute} currentSubRoute={currentSubRoute} />
      {title && (
        <div className='w-full px-8 py-8 rounded-b-sm bg-white shadow-lg relative'>
          <h1 className='text-3xl font-bold'>{title}</h1>
        </div>
      )}
      <div className='h-screen bg-gray px-8'>{children}</div>
      <Footer />
    </>
  );
};

export default AdminPanelLayout;
