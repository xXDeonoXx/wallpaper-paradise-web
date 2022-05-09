import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as Yup from 'yup';

import Dropdown from '../../../components/Dropdown';
import ImageUploadInput from '../../../components/ImageUploadInput';

import AdminPanelLayout from '../../../components/Layout/AdminPanelLayout';
import TextInput from '../../../components/TextInput';
import { withAuth } from '../../../helpers/withAuth';
import { getApi } from '../../../services/api';
import { Category } from '../../../services/categories/categories.interface';

interface CreateImageProps {
  categories: Category[];
}

const Create: React.FC<CreateImageProps> = ({ categories }) => {
  const router = useRouter();

  const api = getApi();
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });

  const [initialValues, setInitialValues] = useState<{
    name: string;
  }>({
    name: '',
  });

  return (
    <AdminPanelLayout
      currentRoute='/admin/categories'
      currentSubRoute='/admin/categories/create'
      title='Create Category'
    >
      <div className='pt-8 h-full flex flex-col items-center'>
        <div className='w-full max-w-6xl p-8 bg-white rounded-lg'>
          <Formik
            initialValues={initialValues}
            onSubmit={async ({ name }) => {
              try {
                const params = { name };
                const res = await api.post('/categories', params);
                router.push('/admin/categories');
              } catch (error) {
                console.log(error);
              }
            }}
            validationSchema={SignupSchema}
          >
            {({
              isSubmitting,
              handleSubmit,
              errors,
              touched,
              setFieldValue,
              values,
              submitForm,
            }) => {
              return (
                <Form
                  action=''
                  className='flex flex-col w-full'
                  onSubmit={handleSubmit}
                >
                  <div className='flex w-full'>
                    <div className='flex flex-col space-y-8 w-full justify-between'>
                      <div className='space-y-8'>
                        <TextInput
                          id='name'
                          label='Name'
                          type='text'
                          error={touched.name ? errors.name : ''}
                          className='w-full'
                        />
                      </div>
                      <div className='flex w-full justify-center mt-8'>
                        <button
                          className='w-full py-2 rounded-lg bg-primary text-white'
                          type='submit'
                          disabled={isSubmitting}
                          onClick={() => {
                            submitForm();
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
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
