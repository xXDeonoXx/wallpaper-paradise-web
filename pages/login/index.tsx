import { Formik } from 'formik';
import React from 'react';
import TextInput from '../../components/TextInput';

const LoginPage = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center bg-gradient-to-br from-primary via-yellow to-secondary'>
      <div className='bg-white w-96 p-8 rounded-lg flex items-center justify-center flex-col'>
        <img src='images/logo.png' className='mb-4' />

        <p className='text-3xl font-bold mb-8'>Sign in</p>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={() => {
            alert('submit');
          }}
        >
          {({ isSubmitting, handleSubmit }) => {
            return (
              <form
                action=''
                className='flex flex-col w-full'
                onSubmit={handleSubmit}
              >
                <TextInput id='email' label='Email' type='email' />
                <TextInput id='password' label='Password' type='password' />

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
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
