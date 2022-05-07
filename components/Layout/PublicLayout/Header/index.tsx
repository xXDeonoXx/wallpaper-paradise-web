import React, { useEffect, useState } from 'react';
import { string } from 'yup/lib/locale';
import { getApi } from '../../../../services/api';
import { Category } from '../../../../services/categories/categories.interface';
import SearchBar from '../../../SearchBar';

interface HeaderProps {
  currentRoute?: string;
  currentSubRoute?: string;
}
interface MenuProps {
  label: string;
  route: string;
  subRoutes?: { label: string; route: string }[];
}

const Header: React.FC<HeaderProps> = ({ currentRoute, currentSubRoute }) => {
  const api = getApi();
  const [categories, setCategories] = useState<Category[]>([]);
  const menus: MenuProps[] = [
    {
      label: 'Categories',
      route: '/admin/categories',
      subRoutes: [
        { label: 'Upload Image', route: '/admin/images/create' },
        { label: 'Pending aproval', route: '/admin/images/pending-aproval' },
        { label: 'Reported', route: '/admin/images/reported' },
      ],
    },
  ];

  interface NavItemProps {
    currentRoute?: string;
    currentSubRoute?: string;
    data: MenuProps;
  }
  const NavItem = ({ data, currentRoute, currentSubRoute }: NavItemProps) => {
    const isSelected = currentRoute === data.route;
    return (
      <div className='relative group h-full flex items-center w-full select-none z-10'>
        <a
          href={`${data.route}`}
          className={`rounded-md px-2 mr-4 ${
            isSelected ? `bg-secondary` : `bg-primary cursor-pointer`
          }`}
        >
          {data.label}
        </a>

        {categories && (
          <div className='pt-12'>
            <div
              className='origin-top-right absolute left-0 w-56 rounded-md overflow-hidden shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray focus:outline-none text-black hidden group-hover:block'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='menu-button'
              tabIndex={-1}
            >
              {categories.map((category) => {
                return (
                  <div className='' role='none' key={category.toString()}>
                    <a
                      href={category.name}
                      className={`text-gray-700 block px-4 py-2 text-sm  ${
                        currentSubRoute === category.name
                          ? 'bg-secondary text-white'
                          : 'hover:bg-primary hover:text-white'
                      } `}
                      role='menuitem'
                      tabIndex={-1}
                      id='menu-item-0'
                    >
                      {category.name}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data.content);
      } catch (error) {}
    })();
  }, []);

  return (
    <nav className='bg-dark h-16 w-full flex justify-between text-white '>
      <div className='flex items-center justify-between'>
        <img
          src={'/images/logo.png'}
          className='flex h-full object-contain w-32 p-2 mx-2'
        />
      </div>
      <div className='flex'>
        {menus.map((menu, index) => {
          return (
            <NavItem
              data={menu}
              key={menu.route}
              currentRoute={currentRoute}
              currentSubRoute={currentSubRoute}
            />
          );
        })}
      </div>
      <div className='flex h-full items-center mx-4 w-full'>
        <SearchBar />
      </div>
      <div className='flex h-full items-center'>
        <div className='flex items-center justify-center rounded-md mx-2 px-2 w-48 h-12 text-center bg-primary select-none cursor-pointer'>
          Upload wallpaper
        </div>
      </div>
    </nav>
  );
};

export default Header;
