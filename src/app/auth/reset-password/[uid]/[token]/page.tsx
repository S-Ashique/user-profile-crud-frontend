"use client";
import ChangePassword from "@/components/auth/change-password";
import { TChangePasswordSchema } from "@/components/auth/form-data";
import { checkUidTokenAndResendOtp, otpandPasswordResetSubmit } from "@/components/backend/auth-api";
import { AuthLoading } from "@/components/manage/loading";
import { TUidTokenParams } from "@/components/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ResetPassword = ({ params }: { params: Promise<TUidTokenParams> }) => {
  const { uid, token } = React.use(params);

  const [mount, setMount] = useState(false);
  const router = useRouter();

  const changePasswordQuery = useMutation({
    mutationFn: (data: TChangePasswordSchema) =>
      otpandPasswordResetSubmit(uid, token, data, "reset-password"),
    onSuccess: ({ data }) => {
      toast.success("Password has changed successfully");
      router.replace(`/auth/sign-in/${data.role}`);
    },
    onError: () => {
      router.replace("/");
    },
  });

   useEffect(() => {
     const fetchData = async () => {
       try {
         await checkUidTokenAndResendOtp(uid, token, "reset-password");
         setMount(true);
       } catch {
         router.replace("/");
       }
     };

     fetchData();
   }, []);

   if (!mount) return <AuthLoading />;
  return (
    <>
      <h3 className="mb-10 auth-heading auth-gradient-heading">
        Update your password
      </h3>
      <ChangePassword changePasswordQuery={changePasswordQuery} />
    </>
  );
};

export default ResetPassword;
