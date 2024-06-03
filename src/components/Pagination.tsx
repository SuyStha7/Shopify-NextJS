"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Pagination {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}

const Pagination = ({ currentPage, hasPrev, hasNext }: Pagination) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const createPageNo = (pageNo: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNo.toString());
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className='flex mt-1 justify-between w-full'>
      <button
        className='rounded-md bg-primary text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-orange-200'
        disabled={!hasPrev}
        onClick={() => createPageNo(currentPage - 1)}>
        Previous
      </button>
      <button
        className='rounded-md bg-primary text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-orange-200'
        disabled={!hasNext}
        onClick={() => createPageNo(currentPage + 1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
