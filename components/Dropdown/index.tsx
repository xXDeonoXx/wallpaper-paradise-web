import { Field, FieldAttributes, FieldProps, FormikErrors } from 'formik';
import React from 'react';
import Select from 'react-select';

interface DropDownProps<T> {
  label: string;
  id: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  error?: string | string[] | FormikErrors<{ value: string; label: string }>[];
  options: { value: string | number; label: string }[];
  isMulti?: boolean;
}

const Dropdown = <T,>({
  label,
  id,
  options,
  error,
  className,
  isMulti,
}: DropDownProps<T>) => {
  return (
    <div className={`col-span-6 sm:col-span-3 ${className}`}>
      <label
        htmlFor={'country'}
        className='block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
      <Field id={id} name={id} autoComplete={id}>
        {({ field, form, meta }: FieldProps) => (
          <Select
            name={field.name}
            onBlur={field.onBlur}
            onChange={(value) => {
              console.log(value);
              form.setFieldValue(field.name, value);
            }}
            isMulti={isMulti}
            className={`mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none
            focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              error ? 'border-red-500' : 'border-gray'
            }`}
            options={options.map((opt) => {
              return { value: opt.value, label: opt.label };
            })}
            defaultValue={options.find((opt) => opt.value == meta.initialValue)}
            styles={{
              control: (provided, state) => ({
                ...provided,
                boxShadow: 'none',
                border: 'none',
                outline: 'none',
              }),
              menu: (provided, state) => ({
                ...provided,
                border: 'none',
                boxShadow: 'none',
                outline: 'none',
              }),
              // option: (provided, state) => ({
              //   ...provided,
              //   backgroundColor: state.isFocused && 'lightgray',
              //   color: state.isFocused && 'red',
              // }),
            }}
          />
        )}
      </Field>
    </div>
  );
};

export default Dropdown;
