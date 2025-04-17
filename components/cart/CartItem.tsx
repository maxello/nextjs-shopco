import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { media as wixMedia } from "@wix/sdk";
import QuantityInput from "../QuantityInput";
import { Trash2, LoaderCircle } from "lucide-react";
import { currentCart } from "@wix/ecom";

const CartItem = ({
  item, 
  onRemoveItem,
  onChangeItemQuantity
}: {
  item: currentCart.LineItem,
  onRemoveItem: (arg0: string | null | undefined) => void,
  onChangeItemQuantity: (arg0: string, arg1: number) => void
}) => {
  const descriptionLines = item.descriptionLines;
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const quantityAvailable = item?.availability?.quantityAvailable || 0;
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantity = (type: "i" | "d") => {
    if (!item._id) return;
    if (type === "d" && quantity > 1) {
      onChangeItemQuantity(item._id, quantity - 1);
    }
    if (type === "i" && quantity < quantityAvailable) {
      onChangeItemQuantity(item._id, quantity + 1);
    }
    setIsLoading(true);
  }

  const handleRemoveItem = (id: string | undefined | null) => {
    setIsLoading(true);
    onRemoveItem(id)
  }

  useEffect(() => {
    if (!item.quantity) return;
    setQuantity(item.quantity);
    setIsLoading(false);
  }, [item.quantity]);

  return (
    <div className="flex gap-4 relative after:h-[1px] after:absolute after:w-full after:-top-4 lg:after:-top-6 after:border-t-[1px] first:after:border-0 after:border-border" key={item._id}>
      {item.image && (
        <div className="aspect-square w-[100px] bg-secondary h-[100px] lg:w-[124px] lg:h-[124px] rounded-lg">
          <Image
            src={wixMedia.getScaledToFillImageUrl(
              item.image,
              124,
              124,
              {}
            )}
            alt=""
            width={124}
            height={124}
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <div className="flex flex-col justify-between w-full">
          <div className="flex items-start justify-between gap-8">
            <div>
              <h3 className="font-semibold text-base lg:text-xl text-primary">
                {item.productName?.original}
              </h3>
              <ul>
                {descriptionLines?.map((line, index) => (
                  <li key={index} className="text-xs md:text-base">
                    <strong className="font-normal text-primary">{line?.name?.original}: </strong>
                    {line.plainText && (
                      <span>{line.plainText.original}</span>
                    )}
                    {line.colorInfo && (
                      <span>{line.colorInfo.original}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            {isLoading ? (
              <LoaderCircle className="animate-spin" size={20} />
            ) : (
              <button
                type="button"
                onClick={() => handleRemoveItem(item._id)}
                disabled={isLoading}
              >
                <Trash2
                  className="text-destructive cursor-pointer"
                  size={20}
                />
              </button>
            )}
          </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-primary text-xl lg:text-2xl font-bold">
              {item?.price?.formattedAmount}
            </span>
          </div>
          <QuantityInput 
            quantity={quantity} 
            handleQuantity={handleQuantity}
            isDecrementDisabled={quantity === 1 || isLoading}
            isIncrementDisabled={!quantityAvailable || quantity === quantityAvailable || isLoading}
            size={"sm"}
          />
        </div>
      </div>
    </div>
  )
}

export default CartItem