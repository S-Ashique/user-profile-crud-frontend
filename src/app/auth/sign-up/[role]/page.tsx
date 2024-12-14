import SignUpForm from "@/components/auth/sign-up-form";
import { TRoleParams } from "@/components/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const SignUp = ({ params }: { params: Promise<TRoleParams> }) => {
  const { role } = React.use(params);

  if (role !== "merchant" && role !== "user") {
    return notFound();
  }
  return (
    <>
      <h3 className="auth-heading auth-gradient-heading">
        {role === "merchant" ? "Become a Host" : "Travel with us"}
      </h3>
      <h3 className="mb-10 auth-heading text-black ">
        {role === "merchant" ? "Earn with Ease " : "Join us today"}
      </h3>
      <SignUpForm role={role} />
      <p>
        Already have an account?
        <Link href={`/auth/sign-in/${role}`} className="link ms-2">
          Sign in
        </Link>
      </p>
    </>
  );
};

export default SignUp;
