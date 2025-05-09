import { OAuthStrategy, createClient } from "@wix/sdk";
import { collections, products } from "@wix/stores";
// import { orders } from "@wix/ecom";
import { cookies } from "next/headers";
// import { members } from '@wix/members';

export const wixClientServer = async () => {
  let refreshToken;
  
  if (typeof window !== 'undefined') {
    try {
      const cookieStore = cookies();
      refreshToken = JSON.parse((await cookieStore).get("refreshToken")?.value || "{}");
    } catch (error) {
      throw JSON.stringify(error, null, 2);
    }
  }
  
  const wixClient = createClient({
    modules: {
      products,
      collections,
      // orders,
      // members,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken,
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
  });

  return wixClient;
};