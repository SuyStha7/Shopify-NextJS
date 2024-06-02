"use client";
import Image from "next/image";
import { useState } from "react";

const ProductImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className=''>
      <div className='h-[400px] relative'>
        <Image
          src={items[index].image?.url}
          alt=''
          sizes='50vw'
          fill
          className='object-cover rounded-md'
        />
      </div>

      <div className='flex justify-between gap-4'>
        {items.map((item: any, i: number) => {
          return (
            <div
              className='w-1/4 h-32 relative gap-4 mt-8 cursor-pointer'
              key={item.id}
              onClick={() => setIndex(i)}>
              <Image
                src={item.image?.url}
                alt=''
                sizes='50vw'
                fill
                className='object-cover rounded-md'
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductImages;
