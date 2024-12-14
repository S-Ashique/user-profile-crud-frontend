import SignInForm from "@/components/auth/sign-in-form";
import { TRoleParams } from "@/components/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const SignIn = ({ params }: { params: Promise<TRoleParams> }) => {
  const { role } = React.use(params);

  if (role !== "merchant" && role !== "user" && role !== "superuser") {
    return notFound();
  }

  return (
    <>
      <h3 className="mb-10 auth-heading auth-gradient-heading">Welcome back</h3>
      <SignInForm role={role} />
      <p>
        Dont&apos;t have an account?
        <Link href={`/auth/sign-up/${role}`} className="link ms-2">
          Sign up
        </Link>
      </p>
    </>
  );
};

export default SignIn;
