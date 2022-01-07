import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className='w-full h-32 border border-red-500'>teste do rombo</div>
    </div>
  );
};

export default Home;
