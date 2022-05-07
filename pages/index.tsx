import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import PublicLayout from '../components/Layout/PublicLayout';
import { getApi } from '../services/api';
import styles from '../styles/Home.module.css';

interface HomeProps {
  images: { content: any[]; totalPages: number; totalElements: number };
}

const Home: NextPage<HomeProps> = ({ images }) => {
  console.log(images);
  return (
    <PublicLayout>
      <div className={styles.container}>
        <div className='w-full h-32 border border-red-500'>teste do rombo</div>
      </div>
    </PublicLayout>
  );
};

export default Home;

export const getServerSideProps = async (
  ctx: any
): Promise<{ props: HomeProps }> => {
  const api = getApi(ctx);
  const page = ctx?.query?.page;
  const params = {
    size: 30,
    page: page || 1,
  };
  const res = await api.get(`images`, { params });
  return { props: { images: res.data } };
};
