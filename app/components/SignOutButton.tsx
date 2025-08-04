"use client";
import { signOut } from "next-auth/react";
import React from "react";

const SignOutButton = () => {
  return <div onClick={() => signOut()}>Sign Out</div>;
};

export default SignOutButton;
