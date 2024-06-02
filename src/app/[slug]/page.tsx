import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";

const SinglePage = () => {
  return (
    <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16'>
      {/* img */}
      <div className='w-full lg:w-1/2 lg:sticky top-20 h-max'>
        <ProductImages />
      </div>

      {/* text */}
      <div className='w-full lg:w-1/2 flex flex-col gap-6'>
        <h1 className='text-4xl font-medium'>Product Name</h1>
        <p className='text-gray-500'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          odit corporis quas alias itaque neque, in illo libero commodi, cum,
          tempora accusantium adipisci soluta cupiditate amet delectus dolor
          vitae saepe.
        </p>
        <div className='h-[2px] bg-gray-100' />
        <div className='flex items-center gap-4'>
          <h3 className='text-xl text-gray-500 line-through'>Rs.49</h3>
          <h3 className='font-medium text-2xl'>Rs.39</h3>
        </div>
        
        <div className='h-[2px] bg-gray-100' />
        <CustomizeProducts />
        <Add />

        <div className='h-[2px] bg-gray-100' />
        <div className='text-sm'>
          <h4 className="font-medium mb-4">Title</h4>
          <p >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. In tempore
            cupiditate odit placeat quibusdam, asperiores tenetur. Vitae magnam,
            quisquam repellendus blanditiis quam corrupti sed alias inventore,
            atque nulla, quidem rem.
          </p>
        </div>
        <div className='text-sm'>
          <h4 className="font-medium mb-4">Title</h4>
          <p >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. In tempore
            cupiditate odit placeat quibusdam, asperiores tenetur. Vitae magnam,
            quisquam repellendus blanditiis quam corrupti sed alias inventore,
            atque nulla, quidem rem.
          </p>
        </div>
        <div className='text-sm'>
          <h4 className="font-medium mb-4">Title</h4>
          <p >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. In tempore
            cupiditate odit placeat quibusdam, asperiores tenetur. Vitae magnam,
            quisquam repellendus blanditiis quam corrupti sed alias inventore,
            atque nulla, quidem rem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
