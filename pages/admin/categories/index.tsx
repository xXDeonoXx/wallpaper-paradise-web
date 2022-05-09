import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Category from '../../../@types/Category';
import Image from '../../../@types/Image';
import ImageHoverPreview from '../../../components/ImageHoverPreview';
import AdminPanelLayout from '../../../components/Layout/AdminPanelLayout';
import Table from '../../../components/Table';
import { withAuth } from '../../../helpers/withAuth';
import { getApi } from '../../../services/api';

interface CategoriesProps {
  data: { content: Category[]; totalPages: number; totalElements: number };
}

const Categories = ({ data }: CategoriesProps) => {
  const api = getApi();
  const [currentItems, setCurrentItems] = useState<Category[]>(data.content);
  const [numberOfPages, setNumberOfPages] = useState(data.totalPages);
  const router = useRouter();

  // Call this function whenever you want to
  // refresh props!
  const refreshData = async ({ selected }: { selected: number }) => {
    router.push(
      {
        pathname: router.basePath,
        query: { page: selected + 1 },
      },
      undefined,
      { shallow: true }
    );
    const page = router?.query?.page;
    const params = {
      size: 10,
      page: selected + 1,
    };
    const res = await api.get(`categories`, { params });
    console.log(res.data.content);
    setCurrentItems(res.data.content);
    setNumberOfPages(res.data.totalPages);
  };

  return (
    <AdminPanelLayout currentRoute='/admin/categories' title='Categories'>
      {/* {images.map((image, index) => {
        return <p key={image.id}>{image.title}</p>;
      })} */}
      <div className='w-full py-4 justify-end flex'>
        <Link href={'/admin/categories/create'}>
          <a className='text-primary font-semibold'>CREATE CATEGORY</a>
        </Link>
      </div>
      <Table
        data={currentItems}
        columns={[
          {
            property: `id`,
            label: `Id`,
            columnClassname: `w-4 `,
            className: 'text-center',
          },
          { property: `name`, label: `Title`, columnClassname: `` },
        ]}
      />
      <div className='w-full flex justify-center mt-4 bg-slate-300 h-16'>
        <ReactPaginate
          breakLabel='...'
          nextLabel='>'
          onPageChange={refreshData}
          pageRangeDisplayed={2}
          pageCount={numberOfPages}
          previousLabel='<'
          // renderOnZeroPageCount={null}
          className=''
          containerClassName='flex items-center'
          pageClassName='bg-slate-200 flex mx-1'
          pageLinkClassName='px-4 py-2 border border-slate-400'
          activeLinkClassName='bg-blue-500 text-white'
          previousClassName='flex'
          previousLinkClassName='px-4 py-2 m-1  bg-slate-200 border border-slate-400'
          nextClassName='flex'
          nextLinkClassName='px-4 py-2 m-1  bg-slate-200 border border-slate-400'
        />
      </div>
    </AdminPanelLayout>
  );
};

export default Categories;

export const getServerSideProps = withAuth(
  async (ctx: any): Promise<{ props: CategoriesProps }> => {
    console.log('chamou');
    const api = getApi(ctx);
    const page = ctx?.query?.page;
    const params = {
      size: 10,
      page: page || 1,
    };
    const res = await api.get(`categories`, { params });
    return { props: { data: res.data } };
  }
);
