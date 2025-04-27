import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixClient } from "@/context/wixContext";

type AdditionalCartProps = {
  subtotal?: {
    formattedAmount?: string,
  },
  subtotalAfterDiscounts?: {
    formattedAmount?: string,
  },
}

type CartState = {
  cart: currentCart.Cart & AdditionalCartProps;
  isLoading: boolean;
  isPending: boolean;
  isError: boolean;
  error: string | null;
  counter: number;
  getCart: (wixClient: WixClient) => void;
  addItem: (
    wixClient: WixClient,
    productId: string,
    variantId: string,
    quantity: number
  ) => Promise<{productId: string, variantId: string} | undefined>;
  changeItemQuantity: (
    wixClient: WixClient,
    lineItemId: string,
    quantity: number
  ) => void;
  removeItem: (wixClient: WixClient, itemId: string | undefined | null) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  isLoading: true,
  isPending: false,
  isError: false,
  error: null,
  counter: 0,
  getCart: async (wixClient) => {
    set((state) => ({ ...state, isLoading: true, isError: false, error: null }));
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      set({
        cart: cart || [],
        isLoading: false,
        counter: cart?.lineItems.length || 0,
      });
    } catch (err) {
      set((prev) => ({ ...prev, isLoading: false, isError: true, error: (err as Error).message }));
    }
  },
  addItem: async (wixClient, productId, variantId, quantity) => {
    set((state) => ({ ...state, isPending: true, isError: false, error: null }));
    try {
      const response = await wixClient.currentCart.addToCurrentCart({
        lineItems: [
          {
            catalogReference: {
              appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
              catalogItemId: productId,
              ...(variantId && { options: { variantId } }),
            },
            quantity: quantity,
          },
        ],
      });

      set({
        cart: response.cart,
        counter: response.cart?.lineItems.length,
        isPending: false,
      });

      return {productId, variantId}
    } catch (err) {
      set((prev) => ({ ...prev, isPending: false, isError: true, error: (err as Error).message }));
    }
  },
  changeItemQuantity: async (wixClient, lineItemId, quantity) => {
    set((state) => ({ ...state, isPending: true, isError: false, error: null }));
    try {
      const response =
        await wixClient.currentCart.updateCurrentCartLineItemQuantity([
          {
            _id: lineItemId,
            quantity,
          },
        ]);

      set({
        cart: response.cart,
        counter: response.cart?.lineItems.length,
        isPending: false,
      });
    } catch (err) {
      set((prev) => ({ ...prev, isPending: false, isError: true, error: (err as Error).message }));
    }
  },
  removeItem: async (wixClient, itemId) => {
    if (!itemId) return;
    set((state) => ({ ...state, isPending: true, isError: false, error: null }));
    try {
      const response = await wixClient.currentCart.removeLineItemsFromCurrentCart([itemId]);
      set({
        cart: response.cart,
        counter: response.cart?.lineItems.length,
        isPending: false,
      });
    } catch (err) {
      set((prev) => ({ ...prev, isPending: false, isError: true, error: (err as Error).message }));
    }
  },
}));
