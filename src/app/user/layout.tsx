import { TChildren } from "@/components/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Profile",
};

const UserLayout = ({ children }: TChildren) => {
  return <>{children}</>;
};

export default UserLayout;
