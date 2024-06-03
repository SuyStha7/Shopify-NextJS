"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='mt-12 flex justify-between'>
      <div className='flex gap-6 flex-wrap'>
        <select
          name='type'
          id=''
          className='py-2 px-4 rounded-2xl text-xs font-medium bg-[#ebeded]'
          onChange={handleFilterChange}>
          <option>Type</option>
          <option value='physical'>Physical</option>
          <option value='digital'>Digital</option>
        </select>

        <input
          type='text'
          name='min'
          placeholder='min price'
          className='text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400'
          onChange={handleFilterChange}
        />
        <input
          type='text'
          name='max'
          placeholder='max price'
          className='text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400'
          onChange={handleFilterChange}
        />

        <select
          name='category'
          id=''
          className='py-2 px-4 rounded-2xl text-xs font-medium bg-[#ebeded]'
          onChange={handleFilterChange}>
          <option>Category</option>
          <option value=''>New Arrivals</option>
          <option value=''>Populars</option>
        </select>

        <select
          name=''
          id=''
          className='py-2 px-4 rounded-2xl text-xs font-medium bg-[#ebeded]'
          onChange={handleFilterChange}>
          <option>All Filters</option>
        </select>
      </div>

      <div className=''>
        <select
          name='sort'
          id=''
          className='py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400'
          onChange={handleFilterChange}>
          <option>Sort By</option>
          <option value='asc price'>Price (low - high)</option>
          <option value='desc price'>Price (high - low)</option>
          <option value='asc lastUpdated'>Newest</option>
          <option value='desc lastUpdated'>Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
