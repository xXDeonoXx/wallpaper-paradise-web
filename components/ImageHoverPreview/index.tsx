import React from 'react';

interface ImageHoverPreviewProps {
  imgUrl: string;
  className?: string;
}

const index: React.FC<ImageHoverPreviewProps> = ({
  children,
  imgUrl,
  className = 'left-full mx-4 w-64 h-auto',
}) => {
  return (
    <div className='group block relative'>
      <div
        className={`absolute  border border-zinc-500 rounded-lg bg-white overflow-hidden z-50 hidden group-hover:inline-block ${className} `}
      >
        <img
          src={imgUrl}
          alt=''
          className='object-contain w-full h-full block'
        />
      </div>
      {children}
    </div>
  );
};

export default index;
