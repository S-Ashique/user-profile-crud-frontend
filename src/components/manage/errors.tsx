"use client";
import { AxiosError } from "axios";
import Button from "../ui/button";
import { TRoleParams } from "../types";
import { useRouter } from "next/navigation";
import { RemoveToken } from "../auth";

export const UserProfileError = ({
  error,
  role,
}: {
  error: Error | null;
  role: TRoleParams["role"];
}) => {
  const router = useRouter();
  let message =
    "An unexpected error occurred. Please try clearing your browser cookies and try again.";
  if (error instanceof AxiosError && error.status) {
    const errorMessages: Record<string, string> = {
      "403":
        "Your account has been temporarily blocked. Please contact support for assistance.",
      "401":
        "The provided token is invalid or has expired. Please log in again.",
    };
    message = errorMessages[error.status];
  }
  return (
    <>
      <div className="flex flex-col items-center max-w-lg mx-auto">
        <p className="mb-6 text-xl font-medium tracking-tight">{message}</p>
        <Button
          variant={"destructive"}
          onClick={() => {
            RemoveToken();
            router.replace(`/auth/sign-in/${role}`);
          }}
        >
          Sign in
        </Button>
      </div>
    </>
  );
};
