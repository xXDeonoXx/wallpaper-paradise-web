import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

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
    title: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(5, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Password is required'),
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
            initialValues={{ title: '', password: '' }}
            onSubmit={async ({ title, password }) => {
              try {
              } catch (error) {
                console.log(error);
              }
            }}
            validationSchema={SignupSchema}
          >
            {({ isSubmitting, handleSubmit, errors }) => {
              return (
                <Form
                  action=''
                  className='flex flex-col w-full'
                  onSubmit={handleSubmit}
                >
                  <TextInput
                    id='title'
                    label='Title'
                    type='text'
                    error={errors.title}
                  />
                  <TextInput
                    id='password'
                    label='Password'
                    type='password'
                    error={errors.password}
                  />
                  {categories?.map((c) => {
                    return c.name;
                  })}

                  <div className='mb-4'>
                    <span
                      className='text-secondary hover:cursor-pointer text-sm'
                      onClick={() => {
                        alert('forgot password');
                      }}
                    >
                      Forget my password
                    </span>
                  </div>

                  <div className='flex w-full justify-center'>
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
