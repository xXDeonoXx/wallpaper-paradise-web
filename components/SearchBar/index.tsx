import React, { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className='w-full max-w-7xl'>
      <input
        className='rounded-md w-full h-10 text-black'
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.currentTarget.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
