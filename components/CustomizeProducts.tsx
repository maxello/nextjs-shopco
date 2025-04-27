"use client";

import { products } from "@wix/stores";
import { useEffect, useState } from "react";
import AddToCart from "@/components/cart/AddToCart";
import { Check } from 'lucide-react';
import Button from "./ui/Button";
import { cn } from '@/lib/utils';

const CustomizeProducts = ({
  productId,
  variants,
  productOptions,
}: {
  productId: string;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
}) => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});
  const [selectedVariant, setSelectedVariant] = useState<products.Variant>();

  useEffect(() => {
    if (!Object.entries(selectedOptions).length) {
      return;
    }
    const variant = variants.find((v) => {
      const variantChoices = v.choices;
      if (!variantChoices) return false;
      return Object.entries(selectedOptions).every(
        ([key, value]) => variantChoices[key] === value
      );
    });
    if (variant?.choices && Object.entries(selectedOptions).length === Object.entries(variant?.choices).length) {
      setSelectedVariant(variant);
    }
    
  }, [selectedOptions, variants]);

  const handleOptionSelect = (optionType: string, choice: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
  };

  const isVariantInStock = (choices: { [key: string]: string }) => {
    return variants.some((variant) => {
      const variantChoices = variant.choices;
      if (!variantChoices) return false;

      return (
        Object.entries(choices).every(
          ([key, value]) => variantChoices[key] === value
        ) &&
        variant.stock?.inStock &&
        variant.stock?.quantity &&
        variant.stock?.quantity > 0
      );
    });
  };

  return (
    <>
      <div className="flex flex-col">
      {productOptions.map((option) => (
        <div className={cn("flex flex-col gap-2.5 last:border-t py-4 border-b border-border", option.name?.toLocaleLowerCase() === "color" ? "order-1" : "order-2")} key={option.name}>
          <strong className="block font-normal">
            {option.name?.toLocaleLowerCase() === "color" ? "Select" : "Choose"} a {option.name}
          </strong>
          <ul className={cn("flex items-center flex-wrap", option.name?.toLocaleLowerCase() === "color" ? "gap-3" : "gap-2 mb-2")}>
            {option.choices?.map((choice) => {
              const disabled = !isVariantInStock({
                ...selectedOptions,
                [option.name!]: choice.description!,
              });

              const selected =
                selectedOptions[option.name!] === choice.description;

              const clickHandler = disabled
                ? undefined
                : () => handleOptionSelect(option.name!, choice.description!);

              return option.name === "Color" ? (
                <li key={choice.description}>
                <button
                  className={`w-9.5 h-9.5 rounded-full relative mb-1 flex items-center justify-center ${choice.description?.toLowerCase() === "white" ? "ring-1 ring-border" : ""}`}
                  style={{
                    backgroundColor: choice.value,
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                  onClick={clickHandler}
                >
                  {selected && (
                    <Check size={18} className={`${choice.description?.toLowerCase() === "white" ? "text-foreground" : "text-white"}`} />
                  )}
                  {disabled && (
                    <div className="absolute w-9.5 h-[1px] bg-destructive -rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                  </button>
                </li>
              ) : (
                <li key={choice.description}>
                <Button
                  type="button"
                  variant={selected ? 'default' : 'secondary'}
                  size={'xs'}
                  disabled={disabled}
                  className="relative"
                  onClick={clickHandler}
                >
                  <>
                    {choice.description}
                    {disabled && (
                      <div className="absolute w-9.5 h-[1px] bg-destructive -rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </>
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      </div>
      <AddToCart
        productId={productId}
        variantId={
          selectedVariant?._id || ""
        }
        stockNumber={selectedVariant?.stock?.quantity || 0}
      />
    </>
  );
};

export default CustomizeProducts;