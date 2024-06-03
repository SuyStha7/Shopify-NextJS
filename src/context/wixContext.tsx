"use client";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import Cookies from "js-cookie";
import { ReactNode, createContext } from "react";

// Safely parse the refreshToken cookie
const refreshTokenCookie = Cookies.get("refreshToken");
const refreshToken = refreshTokenCookie ? JSON.parse(refreshTokenCookie) : {};

// Ensure clientId is a string and handle the case where it might be undefined
const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID;
if (!clientId) {
  throw new Error("NEXT_PUBLIC_WIX_CLIENT_ID environment variable is not set");
}

const wixClient = createClient({
  modules: {
    products,
    collections,
    // currentCart
  },
  auth: OAuthStrategy({
    clientId, // Since we checked for clientId, it is guaranteed to be a string here
    tokens: {
      refreshToken,
      accessToken: { value: "", expiresAt: 0 },
    },
  }),
});

export type WixClient = typeof wixClient;

export const WixClientContext = createContext<WixClient>(wixClient);

export const WixClientContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <WixClientContext.Provider value={wixClient}>
      {children}
    </WixClientContext.Provider>
  );
};
