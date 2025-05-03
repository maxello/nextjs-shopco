"use client";

import React, { useCallback } from "react";
import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { currentCart } from "@wix/ecom";
import CartItem from "./CartItem";
import Button from "../ui/Button";
import Link from "next/link";
import PromoCode from "../PromoCode";
import { ArrowRight } from "lucide-react";
import { CartSkeleton } from "../Skeletons";

const Cart = () => {
  const wixClient = useWixClient();
  const { cart, isLoading, isPending, isError, error, removeItem, changeItemQuantity } = useCartStore();

  const handleCheckout = async () => {
    try {
      const checkout =
        await wixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        });

      const { redirectSession } =
        await wixClient.redirects.createRedirectSession({
          ecomCheckout: { checkoutId: checkout.checkoutId },
          callbacks: {
            postFlowUrl: window.location.origin,
            thankYouPageUrl: `${window.location.origin}/success`,
          },
        });

      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onChangeItemQuantity = useCallback((lineItemId: string, quantity: number) => {
    changeItemQuantity(wixClient, lineItemId, quantity);
  }, [wixClient, changeItemQuantity]);

  const emptyCartElement = () => {
    return (
      <>
        <h2 className="text-lg">Your cart is empty</h2>
        <Link href={"/"} className="h-13 px-5 w-full max-w-[260px] text-base flex justify-center items-center focus:outline-none disabled:text-white disabled:bg-gray-300 disabled:border-gray-300 cursor-pointer disabled:cursor-not-allowed font-medium rounded-full [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition text-primary-foreground border border-primary bg-primary hover:bg-primary/80 hover:border-primary/80 active:bg-primary/80 active:border-primary/80">Go to Home Page</Link>
      </>
    )
  }

  return (
    <div className="flex flex-col gap-6 mb-6 lg:mb-12 relative">
      {isLoading && <CartSkeleton />}
      {isError && (
        <>
          {error?.includes("Cart not found: Cannot find cart by ownership") ? (
            emptyCartElement()
          ) : (
            <div>Something went wrong with cart. Try again later.</div>
          )}
        </>
      )}

      {cart.lineItems && (
        <>
          {cart.lineItems.length > 0 ? (
            <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full lg:w-[59%]">
              <div className="lg:sticky lg:top-[140px]">
                <div className="flex border border-border p-3 md:p-5 lg:p-6 rounded-[20px] flex-col gap-8 lg:gap-12">
                  {cart.lineItems.map((item) => (
                    <CartItem
                      key={item._id}
                      item={item}
                      onRemoveItem={(id) => removeItem(wixClient, id)}
                      onChangeItemQuantity={onChangeItemQuantity}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[41%] relative">
              <div className="lg:sticky lg:top-[140px]">
              <div className="border border-border rounded-[20px] p-5 lg:p-6 flex flex-col gap-4 lg:gap-6">
                <h2 className="text-[1.25rem] lg:text-2xl font-bold text-primary">Order Summary</h2>
                <ul className="text-base lg:text-xl flex flex-col gap-4">
                  <li className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-primary">{cart?.subtotal?.formattedAmount}</span>
                  </li>
                  {/* <li className="flex items-center justify-between">
                    <span className="">Discount (-20%)</span>
                    <span className="font-bold text-destructive">-$113</span>
                  </li> */}
                  <li className="flex items-center justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-primary">-</span>
                  </li>
                </ul>
                <div className="text-base lg:text-xl flex items-center justify-between border-t pt-4 border-border">
                  <span className="text-primary">Total</span>
                  <span className="font-bold text-primary text-[1.25rem] lg:text-2xl">{cart?.subtotalAfterDiscounts?.formattedAmount}</span>
                </div>
                <PromoCode />
                <Button
                  className="lg:mb-2 gap-3"
                  size={'xl'}
                  disabled={isLoading || isPending}
                  onClick={handleCheckout}
                >
                  Go to Checkout
                  <span className="w-5.5 h-5.5 flex items-center">
                    <ArrowRight className="min-w-full min-h-full" />
                  </span>
                </Button>
              </div>
              </div>
            </div>
          </div>
          ) : (
            emptyCartElement()
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
