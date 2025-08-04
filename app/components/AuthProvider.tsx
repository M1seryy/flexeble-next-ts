"use client";
import React, { useEffect, useState } from "react";
import {
  getProviders,
  signIn,
  ClientSafeProvider,
  LiteralUnion,
  signOut,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

type Providers = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
>;

const AuthProvider = () => {
  const [providers, setProviders] = useState<Providers | null>(null);
  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    fetchProviders();
  }, []);

  if (!providers) return null;

  return (
    <div>
      {Object.values(providers).map((provider, index) => (
        <button key={index} onClick={() => signIn(provider.id)}>
          Sign in with {provider.name}
        </button>
      ))}
    </div>
  );
};

export default AuthProvider;
