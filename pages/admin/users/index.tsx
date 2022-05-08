import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Role from '../../../@types/Role';
import User from '../../../@types/User';
import ImageHoverPreview from '../../../components/ImageHoverPreview';
import AdminPanelLayout from '../../../components/Layout/AdminPanelLayout';
import Table from '../../../components/Table';
import { withAuth } from '../../../helpers/withAuth';
import { getApi } from '../../../services/api';

interface UsersProps {
  data: { content: User[]; totalPages: number; totalElements: number };
}

const Users = ({ data }: UsersProps) => {
  const api = getApi();
  const [users, setUsers] = useState<User[]>(data.content);
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
    const res = await api.get(`images`, { params });
    setUsers(res.data.content);
    setNumberOfPages(res.data.totalPages);
  };

  return (
    <AdminPanelLayout currentRoute='/admin/users' title='Users'>
      {/* {images.map((image, index) => {
        return <p key={image.id}>{image.title}</p>;
      })} */}
      <div className='w-full py-8 justify-end flex'>
        {/* <Link href={'/admin/users/create'}>
          <a className='text-primary font-semibold'>CREATE USER</a>
        </Link> */}
      </div>
      <Table
        data={users}
        columns={[
          {
            property: `id`,
            label: `Id`,
            columnClassname: `w-4 `,
            className: 'text-center',
          },
          { property: `name`, label: `Name`, columnClassname: `` },
          {
            property: `nickname`,
            label: `Nickname`,
            type: 'text',
            className: `whitespace-nowrap text-ellipisis`,
            columnClassname: `w-16`,
          },
          {
            property: `roles`,
            label: `Roles`,
            type: 'text',
            className: `whitespace-nowrap text-ellipisis`,
            columnClassname: `w-16`,
            custom: (item) => {
              return (
                <p>
                  {item?.roles?.map((role, index) => {
                    return index == item.roles.length ? (
                      <p key={role.id}>{role.initials}, </p>
                    ) : (
                      <p key={role.id}>{role.initials}</p>
                    );
                  })}
                </p>
              );
            },
          },
          {
            property: `email`,
            label: `Email`,
            columnClassname: `w-1/4`,
          },
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

export default Users;

export const getServerSideProps = withAuth(
  async (ctx: any): Promise<{ props: UsersProps }> => {
    // console.log('chamou');
    const api = getApi(ctx);
    const page = ctx?.query?.page;
    const params = {
      size: 10,
      page: page || 1,
    };
    const res = await api.get(`/users`, { params });
    return { props: { data: res.data } };
  }
);
