"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TChildren } from "../types";

const queryClient = new QueryClient();

const QueryProvider = ({ children }: TChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
