import { TChildren } from "@/components/types";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Authentication | Newx",
};

const AuthLayout = ({ children }: TChildren) => {
  return (
    <>
      <div className="mt-4 mb-8 ms-2 md:ms-4 relative">
        <Link
          href={"/"}
          replace
          className="text-black text-2xl md:text-3xl tracking-[-.25rem] md:tracking-[-.3rem] relative z-50"
        >
          NEWX
        </Link>
        <div className="h-14 w-20 bg-amber-300 absolute -top-2 -left-1.5 blur-lg -z-10 rounded-br-3xl"></div>
      </div>
      <div className="max-w-lg mx-auto mb-10 ">{children}</div>
    </>
  );
};

export default AuthLayout;
