import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import Dropdown from '../../../components/Dropdown';

import AdminPanelLayout from '../../../components/Layout/AdminPanelLayout';
import TextInput from '../../../components/TextInput';
import { withAuth } from '../../../helpers/withAuth';
import { getApi } from '../../../services/api';
import { Category } from '../../../services/categories/categories.interface';

interface CreateImageProps {
  categories: Category[];
}

const Create: React.FC<CreateImageProps> = ({ categories }) => {
  const SignupSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    category: Yup.string().required('Category is required'),
  });

  return (
    <AdminPanelLayout
      currentRoute='/admin/images'
      currentSubRoute='/admin/images/create'
      title='Upload Image'
    >
      <div className='pt-8 h-full flex flex-col items-center'>
        <div className='w-full max-w-3xl p-8 bg-white rounded-lg'>
          <Formik
            initialValues={{ title: '', category: '' }}
            onSubmit={async ({ title, category }) => {
              try {
              } catch (error) {
                console.log(error);
              }
            }}
            validationSchema={SignupSchema}
          >
            {({ isSubmitting, handleSubmit, errors, touched }) => {
              return (
                <Form
                  action=''
                  className='flex flex-col w-full'
                  onSubmit={handleSubmit}
                >
                  <div className='flex justify-between space-x-8'>
                    <TextInput
                      id='title'
                      label='Title'
                      type='text'
                      error={touched.title ? errors.title : ''}
                      className='w-full'
                    />

                    <Dropdown
                      id='category'
                      label='Category'
                      type='category'
                      error={touched.category ? errors.category : ''}
                      options={categories.map((c) => {
                        return { label: c.name, value: c.id };
                      })}
                      className='w-full'
                    />
                  </div>

                  <div className='flex w-full justify-center mt-8'>
                    <button
                      className='w-full py-2 rounded-lg bg-primary text-white'
                      type='submit'
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </AdminPanelLayout>
  );
};

export default Create;

export const getServerSideProps = withAuth(
  async (ctx: any): Promise<{ props: CreateImageProps }> => {
    try {
      const api = getApi(ctx);
      const res = await api.get('/categories', { params: { size: 100 } });
      return { props: { categories: res.data.content } };
    } catch (error) {
      // console.log(error);
    }
    return { props: { categories: [] } };
  }
);
