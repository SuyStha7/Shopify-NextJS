"use client";

import { products } from "@wix/stores";
import { useEffect, useState } from "react";
import Add from "./Add";

// Define the component props types
interface CustomizeProductsProps {
  productId: string;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
}

const CustomizeProducts = ({
  productId,
  variants,
  productOptions,
}: CustomizeProductsProps) => {
  // State to manage selected options and selected variant
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});
  const [selectedVariant, setSelectedVariant] = useState<
    products.Variant | undefined
  >();

  // Effect to update the selected variant when options change
  useEffect(() => {
    const variant = variants.find(
      (v) =>
        v.choices &&
        Object.entries(selectedOptions).every(
          ([key, value]) => v.choices![key] === value
        )
    );
    setSelectedVariant(variant);
  }, [selectedOptions, variants]);

  // Handler for selecting an option
  const handleOptionSelect = (optionType: string, choice: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
  };

  // Check if a variant with the given choices is in stock
  const isVariantInStock = (choices: { [key: string]: string }) => {
    return variants.some(
      (variant) =>
        variant.choices &&
        Object.entries(choices).every(
          ([key, value]) => variant.choices![key] === value
        ) &&
        variant.stock?.inStock &&
        (variant.stock.quantity ?? 0) > 0
    );
  };

  return (
    <div className='flex flex-col gap-6'>
      {productOptions.map((option) => (
        <div
          className='flex flex-col gap-4'
          key={option.name}>
          <h4 className='font-medium'>{option.name}</h4>
          <ul className='flex items-center gap-3'>
            {option.choices?.map((choice) => {
              const isDisabled = !isVariantInStock({
                ...selectedOptions,
                [option.name!]: choice.description!,
              });

              const isSelected =
                selectedOptions[option.name!] === choice.description;

              const handleClick = isDisabled
                ? undefined
                : () => handleOptionSelect(option.name!, choice.description!);

              return option.name === "Color" ? (
                <li
                  key={choice.description}
                  className='w-8 h-8 rounded-full relative'
                  style={{
                    backgroundColor: choice.value,
                    cursor: isDisabled ? "not-allowed" : "pointer",
                  }}
                  onClick={handleClick}>
                  {isSelected && (
                    <div className='absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
                  )}
                  {isDisabled && (
                    <div className='absolute w-10 h-[2px] bg-orange-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
                  )}
                </li>
              ) : (
                <li
                  key={choice.description}
                  className='ring-1 text-primary rounded-md py-1 px-4 text-sm'
                  style={{
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    backgroundColor: isSelected
                      ? "#f24d12"
                      : isDisabled
                      ? "#fbcfe8"
                      : "#fff",
                    color: isSelected || isDisabled ? "#fff" : "#f24d12",
                    boxShadow: isDisabled ? "none" : "",
                  }}
                  onClick={handleClick}>
                  {choice.description}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      
      <Add
        productId={productId}
        variantId={
          selectedVariant?._id || "00000000-000000-000000-000000000001"
        }
        stockNo={selectedVariant?.stock?.quantity || 0}
      />
    </div>
  );
};

export default CustomizeProducts;
