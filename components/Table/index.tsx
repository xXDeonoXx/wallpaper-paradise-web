import React, { HTMLAttributes } from 'react';
import { get } from 'lodash';

interface TableProps<T> {
  data: T[];
  columns: {
    label: string;
    property: keyof T;
    type?: `text` | `link` | `custom`;
    custom?: (value: any) => React.ReactNode;
    className?: string;
    columnClassname?: string;
  }[];
}

const Table = <T,>({ data, columns }: TableProps<T>) => {
  return (
    <div className='w-full flex flex-col rounded-lg'>
      <table className='p-4 w-full'>
        <thead className='bg-secondary text-white'>
          <tr className=''>
            {columns.map((cl) => {
              return (
                <th
                  key={cl.label}
                  className={`px-4 py-2 text-xl text-left ${cl.columnClassname}`}
                >
                  {cl.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className='bg-white w-full'>
          {data.map((d, index) => {
            return (
              <tr
                className={` ${index % 2 ? `bg-gray` : ``}`}
                key={d as unknown as React.Key}
              >
                {columns.map((r, index) => {
                  return (
                    <td
                      key={r as any}
                      className={`text-lg px-4 ${r.className}`}
                    >
                      {r.custom
                        ? r.custom(get(d, r.property))
                        : get(d, r.property)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
