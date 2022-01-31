import React from 'react';
import AdminPanelLayout from '../../../components/Layout/AdminPanelLayout';
import Table from '../../../components/Table';
import { withAuth } from '../../../helpers/withAuth';
import { getApi } from '../../../services/api';

interface ImagesProps {
  images: any[];
}

const Images = ({ images }: ImagesProps) => {
  return (
    <AdminPanelLayout currentRoute='/admin/images' title='Images'>
      {/* {images.map((image, index) => {
        return <p key={image.id}>{image.title}</p>;
      })} */}
      <Table
        data={images}
        columns={[
          { property: `id`, label: `Id`, columnClassname: `w-4` },
          { property: `title`, label: `Title`, columnClassname: `` },
          {
            property: `url`,
            label: `Url`,
            type: 'link',
            className: `whitespace-nowrap overflow-hidden text-ellipisis`,
            columnClassname: `w-16`,
            custom: (value) => {
              return (
                <a
                  className='underline cursor-pointer text-blue-500'
                  target={'_blank'}
                  href={value}
                  rel='noreferrer'
                >
                  Preview
                </a>
              );
            },
          },
          {
            property: `uploader.name`,
            label: `Uploader`,
            columnClassname: `w-1/4`,
          },
        ]}
      />
    </AdminPanelLayout>
  );
};

export default Images;

export const getServerSideProps = withAuth(
  async (ctx: any): Promise<{ props: ImagesProps }> => {
    const api = getApi();
    const res = await api.get(`images`);
    return { props: { images: res.data.content } };
  }
);
