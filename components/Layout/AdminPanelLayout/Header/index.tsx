import React, { useState } from 'react';
import { string } from 'yup/lib/locale';

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
  const menus: MenuProps[] = [
    { label: 'Dashboard', route: '/admin/dashboard' },
    {
      label: 'Images',
      route: '/admin/images',
      subRoutes: [
        { label: 'Pending aproval', route: '/admin/images/pending-aproval' },
        { label: 'Reported', route: '/admin/images/reported' },
      ],
    },
    { label: 'Users', route: '/admin/users' },
    { label: 'Categories', route: '/admin/categories' },
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
          className={`rounded-md px-2 mr-8 ${
            isSelected ? `bg-secondary` : `bg-primary cursor-pointer`
          }`}
        >
          {data.label}
        </a>

        {data.subRoutes && (
          <div className='pt-12'>
            <div
              className='origin-top-right absolute left-0 w-56 rounded-md overflow-hidden shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray focus:outline-none text-black hidden group-hover:block'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='menu-button'
              tabIndex={-1}
            >
              {data.subRoutes.map((data) => {
                return (
                  <div className='' role='none' key={data.toString()}>
                    <a
                      href={data.route}
                      className={`text-gray-700 block px-4 py-2 text-sm  ${
                        currentSubRoute === data.route
                          ? 'bg-secondary text-white'
                          : 'hover:bg-primary hover:text-white'
                      } `}
                      role='menuitem'
                      tabIndex={-1}
                      id='menu-item-0'
                    >
                      {data.label}
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

  return (
    <nav className='bg-dark h-16 w-full flex justify-between text-white'>
      <div className='flex'>
        <img src={'/images/logo.png'} className='flex h-full p-2 mx-8' />
        <div className='h-full w-32 flex items-center'>
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
      </div>
      <div>right</div>
    </nav>
  );
};

export default Header;
