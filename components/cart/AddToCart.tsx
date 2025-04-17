"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import QuantityInput from "../QuantityInput";
import { WixClient } from "@/context/wixContext";
import clsx from "clsx";

const AddToCart = ({
  productId,
  variantId,
  stockNumber,
}: {
  productId: string;
  variantId: string;
  stockNumber: number;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  
  useEffect(() => {
    if (stockNumber < quantity) {
      setQuantity(1);
    }
  }, [stockNumber, quantity]);

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  const wixClient = useWixClient();

  const { addItem, isPending } = useCartStore();
  
  const onAddItem = async (
    wixClient: WixClient,
    productId: string,
    variantId: string,
    quantity: number
  ) => {
    setIsAddedToCart(false);
    const response = await addItem(wixClient, productId, variantId, quantity);
    if (response?.productId === productId) {
      setIsAddedToCart(true);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAddedToCart(false);
    }, 1500);

    if (!isAddedToCart) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    }
  }, [isAddedToCart]);

  return (
    <div className="py-6 gap-4 max-w-[500px] lg:max-w-full">
      <div className="flex items-center justify-between gap-3 md:gap-5 mb-5">
        <div className="flex items-center gap-4">
          <QuantityInput
            quantity={quantity}
            handleQuantity={handleQuantity}
            isDecrementDisabled={quantity === 1}
            isIncrementDisabled={!stockNumber || quantity === stockNumber}
          />
        </div>
        <Button
          onClick={() => onAddItem(wixClient, productId, variantId, quantity)}
          disabled={isPending || !stockNumber}
          className={clsx("w-full", isAddedToCart && "animate-wiggle")}
          size={'md'}
        >
          {isAddedToCart ? "Added to Cart" : "Add to Cart"}
        </Button>
      </div>
      {stockNumber < 1 ? (
        <div className="text-xs">
          {variantId ? (
            <div className="text-xs text-destructive">
              Product is out of stock
            </div>
          ) : (
            <div className="text-xs">
              Choose your variant and then add to cart
            </div>
          )}
        </div>
      ) : (
        <div className="text-xs">
          {stockNumber < 10 && "Only"} <span className="text-destructive">{stockNumber} items</span>{" "}
          left
        </div>
      )}
    </div>
  );
};

export default AddToCart;