"use client";
import Image from "next/image";
import { useState } from "react";

const images = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/615003/pexels-photo-615003.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/6068960/pexels-photo-6068960.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/3812433/pexels-photo-3812433.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    url: "https://images.pexels.com/photos/3768005/pexels-photo-3768005.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const ProductImages = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className=''>
      <div className='h-[400px] relative'>
        <Image
          src={images[index].url}
          alt=''
          sizes='50vw'
          fill
          className='object-cover rounded-md'
        />
      </div>

      <div className='flex justify-between gap-4'>
        {images.map((img, i) => {
          return (
            <div
              className='w-1/4 h-32 relative gap-4 mt-8 cursor-pointer'
              key={img.id}
              onClick={() => setIndex(i)}>
              <Image
                src={img.url}
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
