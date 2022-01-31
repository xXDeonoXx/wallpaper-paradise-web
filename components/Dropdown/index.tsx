import { Field } from 'formik';
import React from 'react';

interface DropDownProps<T> {
  label: string;
  id: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  error?: string;
  options: { value: string | number; label: string }[];
}

const Dropdown = <T,>({
  label,
  id,
  options,
  error,
  className,
}: DropDownProps<T>) => {
  return (
    <div className={`col-span-6 sm:col-span-3 ${className}`}>
      <label
        htmlFor={'country'}
        className='block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
      <Field
        as={'select'}
        id={id}
        name={id}
        autoComplete={id}
        className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none
         focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
           error ? 'border-red-500' : 'border-gray'
         }`}
      >
        {options.map((opt) => {
          return (
            <option key={opt as any} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </Field>
    </div>
  );
};

export default Dropdown;
