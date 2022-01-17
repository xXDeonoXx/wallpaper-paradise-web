import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import TextInput from '../../components/TextInput';
import * as Yup from 'yup';
import { AuthContext } from '../../contexts/AuthContext';
import { parseCookies } from 'nookies';
import { NextPageContext, NextApiRequest } from 'next';

const LoginPage = () => {
  const { signIn } = useContext(AuthContext);

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(5, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Password is required'),
  });

  return (
    <div className='w-full h-screen flex items-center justify-center bg-gradient-to-br from-primary via-yellow to-secondary'>
      <div className='bg-white w-96 p-8 rounded-lg flex items-center justify-center flex-col'>
        <img src='images/logo.png' className='mb-4 h-16' />
        <p className='text-3xl font-bold mb-8'>Sign in</p>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async ({ email, password }) => {
            try {
              signIn(email, password);
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
                  id='email'
                  label='Email'
                  type='email'
                  error={errors.email}
                />
                <TextInput
                  id='password'
                  label='Password'
                  type='password'
                  error={errors.password}
                />

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
  );
};

export const getServerSideProps = (ctx: any) => {
  const { access_token } = parseCookies(ctx);
  if (access_token) {
    return {
      redirect: {
        destination: '/admin/dashboard',
        statusCode: 302,
      },
    };
  }
  return { props: {} };
};

export default LoginPage;
