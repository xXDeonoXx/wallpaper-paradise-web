import Link from 'next/link';
import React from 'react';
import ImageHoverPreview from '../../../components/ImageHoverPreview';
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
      <div className='w-full py-4 justify-end flex'>
        <Link href={'/admin/images/create'}>
          <a className='text-primary font-semibold'>UPLOAD IMAGE</a>
        </Link>
      </div>
      <Table
        data={images}
        columns={[
          { property: `id`, label: `Id`, columnClassname: `w-4` },
          { property: `title`, label: `Title`, columnClassname: `` },
          {
            property: `url`,
            label: `Url`,
            type: 'link',
            className: `whitespace-nowrap text-ellipisis`,
            columnClassname: `w-16`,
            custom: (value) => {
              // return (
              //   <a
              //     className='underline cursor-pointer text-blue-500'
              //     target={'_blank'}
              //     href={value}
              //     rel='noreferrer'
              //   >
              //     Preview
              //   </a>
              // );
              return (
                <ImageHoverPreview imgUrl={value}>
                  <a
                    className='underline cursor-pointer text-blue-500'
                    target={'_blank'}
                    href={value}
                    rel='noreferrer'
                  >
                    Preview
                  </a>
                </ImageHoverPreview>
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
    const api = getApi(ctx);
    const res = await api.get(`images`);
    return { props: { images: res.data.content } };
  }
);
