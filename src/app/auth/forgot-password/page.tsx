import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import React from "react";

const ForgotPassword = () => {
  return (
    <>
      <h3 className="mb-10 auth-heading auth-gradient-heading">
        Forgot your password?
      </h3>
      <p className="mb-6 font-medium text-base text-stone-950">
        No worries, we&apos;ll send you reset instructions.
      </p>
      <ForgotPasswordForm />
    </>
  );
};

export default ForgotPassword;
