import React from 'react';
import { withAuth } from '../../helpers/withAuth';

const DashBoard = () => {
  return <div>Dashboard</div>;
};

export default DashBoard;

export const getServerSideProps = withAuth((ctx: any) => {
  return { props: {} };
});
