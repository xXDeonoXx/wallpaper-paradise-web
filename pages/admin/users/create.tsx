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
    title: Yup.string().required('Title is required'),
    categories: Yup.array().min(1, 'Category is required'),
    image: Yup.string().required('Image is required'),
  });

  const [initialValues, setInitialValues] = useState<{
    title: string;
    categories: { label: string; value: number }[];
    image: File | undefined;
  }>({
    title: '',
    categories: [],
    image: undefined,
  });

  return (
    <AdminPanelLayout
      currentRoute='/admin/images'
      currentSubRoute='/admin/images/create'
      title='Upload Image'
    >
      <div className='pt-8 h-full flex flex-col items-center'>
        <div className='w-full max-w-6xl p-8 bg-white rounded-lg'>
          <Formik
            initialValues={initialValues}
            onSubmit={async ({ title, categories, image }) => {
              try {
                if (!image) return;
                const imageFormData = new FormData();
                imageFormData.append('file', image, image.name);
                categories.forEach((category, index) => {
                  imageFormData.append(
                    `categories[${index}]`,
                    category?.value.toString()
                  );
                });
                imageFormData.append('title', title);

                const res = await api.post('/images', imageFormData);
                router.push('/admin/images');
                console.log(res);
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
                          id='title'
                          label='Title'
                          type='text'
                          error={touched.title ? errors.title : ''}
                          className='w-full'
                        />

                        <Dropdown
                          id='categories'
                          label='Categories'
                          type='categories'
                          error={touched.categories ? errors.categories : ''}
                          options={categories.map((c) => {
                            return { label: c.name, value: c.id };
                          })}
                          isMulti
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
                    <div className='mt-8 w-full flex justify-center'>
                      <ImageUploadInput
                        onChange={(uri) => {
                          setFieldValue('image', uri);
                        }}
                      />
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
