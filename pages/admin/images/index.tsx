import React from 'react';
import AdminPanelLayout from '../../../components/Layout/AdminPanelLayout';
import { withAuth } from '../../../helpers/withAuth';

const DashBoard = () => {
  return <AdminPanelLayout>Dashboard</AdminPanelLayout>;
};

export default DashBoard;

export const getServerSideProps = withAuth((ctx: any) => {
  return { props: {} };
});
