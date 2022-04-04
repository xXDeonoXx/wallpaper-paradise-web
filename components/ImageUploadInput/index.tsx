import React, { useState } from 'react';
import { PhotographIcon } from '@heroicons/react/solid';

interface ImageUploadInputProps {
  onChange: (uri: File) => void;
}

const ImageUploadInput = ({ onChange }: ImageUploadInputProps) => {
  const [image, setImage] = useState<File>();
  return (
    <div className='border-2 border-dashed border-dark rounded-md p-4 w-sm'>
      <label className='w-full h-full'>
        <input
          type='file'
          className='hidden'
          accept='image/*'
          onChange={(event) => {
            if (event.target.files && event.target.files[0]) {
              setImage(event.target.files[0]);
              onChange(event.target.files[0]);
            }
          }}
        />
        <div className='w-full flex flex-col justify-center items-center'>
          {image ? (
            <img src={URL.createObjectURL(image)} alt='' className='w-64' />
          ) : (
            <PhotographIcon className='w-16' />
          )}
          <p className='max-w-xs text-center'>
            <span className='text-primary cursor-pointer hover:underline'>
              Upload a file
            </span>{' '}
            or drag and drop PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </label>
    </div>
  );
};

export default ImageUploadInput;
