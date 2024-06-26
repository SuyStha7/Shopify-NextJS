import Image from "next/image";
import Link from "next/link";
import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 8;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
  isHomepage,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
  isHomepage?: boolean;
}) => {
  const wixClient = await wixClientServer();
  const productQuery = await wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome("productType", [searchParams?.type || "physical", "digital"])
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 99999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
        : 0
    );

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams?.sort.split(" ");

    if (sortType === "asc") {
      productQuery.ascending(sortBy);
    }
    if (sortType === "desc") {
      productQuery.descending(sortBy);
    }
  }

  const res = await productQuery.find();

  return (
    <div className='mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap'>
      {res.items.map((product: products.Product) => (
        <Link
          href={"/" + product.slug}
          className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'
          key={product._id}>
          <div className='relative w-full h-80'>
            <Image
              src={product.media?.mainMedia?.image?.url || "product.png"}
              alt=''
              fill
              sizes='25vw'
              className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easeIn duration-500'
            />
            {product.media?.items && (
              <Image
                src={product.media?.items[1]?.image?.url || "product.png"}
                alt=''
                fill
                sizes='25vw'
                className='absolute object-cover rounded-md'
              />
            )}
          </div>

          <div className='flex justify-between'>
            <span className='font-medium'>{product.name}</span>
            <span className='font-semibold'>
              Rs.{product.price?.discountedPrice}
            </span>
          </div>

          <div>
            {product.additionalInfoSections && (
              <div
                className='text-gray-500 text-sm'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    product.additionalInfoSections?.find(
                      (section: any) => section.title === "SHORT DESCRIPTION"
                    )?.description || ""
                  ),
                }}></div>
            )}
          </div>

          <button className='rounded-2xl ring-1 ring-primary text-primary px-4 py-2 w-max textsm hover:bg-primary hover:text-white'>
            Add to Cart
          </button>
        </Link>
      ))}

      {!isHomepage && (
        <Pagination
          currentPage={res.currentPage || 0}
          hasPrev={res.hasPrev()}
          hasNext={res.hasNext()}
        />
      )}
    </div>
  );
};

export default ProductList;
