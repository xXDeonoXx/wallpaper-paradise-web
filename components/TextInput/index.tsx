import { Field } from 'formik';
import React from 'react';

interface TextInputProps {
  label: string;
  id: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  id,
  type,
  className = 'mb-4',
  error,
}) => {
  return (
    <div className={`${className}`}>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <Field
        type={type}
        name={id}
        id={id}
        autoComplete={type}
        className={`mt-1 focus:ring-secondary focus:border-secondary block w-full shadow-sm sm:text-sm rounded-md font-inter ${
          error ? 'border-red-500' : 'border-gray'
        }`}
      />
      <span className='text-red-500 text-sm'>{error}</span>
    </div>
  );
};

export default TextInput;
