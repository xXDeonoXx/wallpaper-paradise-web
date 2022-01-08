import React from 'react';

interface TextInputProps {
  label: string;
  id: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  id,
  type,
  className = 'mb-4',
}) => {
  return (
    <div className={className}>
      <label
        htmlFor='first-name'
        className='block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        autoComplete={type}
        className='mt-1 border-gray focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md font-inter'
      />
    </div>
  );
};

export default TextInput;
