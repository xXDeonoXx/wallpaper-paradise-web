import type { NextPage } from 'next';
import StackGrid from 'react-stack-grid';
import PublicLayout from '../components/Layout/PublicLayout';
import { getApi } from '../services/api';

interface HomeProps {
  images: { content: any[]; totalPages: number; totalElements: number };
}

const Home: NextPage<HomeProps> = ({ images }) => {
  return (
    <PublicLayout>
      <div className={`w-full p-2`}>
        <StackGrid columnWidth={200} appearDelay={50}>
          {images.content.map((image) => {
            return (
              <div
                className='relative group'
                // style={{ backgroundImage: `url(${image.url})` }}
                key={image.id}
              >
                <img className='w-full object-contain' src={image.url} alt='' />
                <div
                  className='absolute bottom-0 
                w-full h-16 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 
                transition-opacity duration-200 text-white p-2'
                >
                  {image.title}
                </div>
              </div>
            );
          })}
        </StackGrid>
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
