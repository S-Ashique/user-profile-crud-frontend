"use client";
import React, { useEffect, useState } from "react";
import { TUidTokenParams } from "@/components/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TVerifyOtpSchema, verifyOtpSchema } from "@/components/auth/form-data";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
  checkUidTokenAndResendOtp,
  otpandPasswordResetSubmit,
} from "@/components/backend/auth-api";
import { toast } from "sonner";
import { saveToken } from "@/components/auth";
import { RotateCwIcon } from "lucide-react";
import { AuthLoading } from "@/components/manage/loading";

const VerifyOtp = ({ params }: { params: Promise<TUidTokenParams> }) => {
  const { uid, token } = React.use(params);

  const router = useRouter();
  const [mount, setMount] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TVerifyOtpSchema>({
    resolver: zodResolver(verifyOtpSchema),
    mode: "onChange",
  });

  const resendOtp = useMutation({
    mutationFn: () => checkUidTokenAndResendOtp(uid, token, "resend-otp"),
    onSuccess: ({ data }) => {
      toast.success(data.message);
    },
  });

  const verifyOtp = useMutation({
    mutationFn: (data: TVerifyOtpSchema) =>
      otpandPasswordResetSubmit(uid, token, data, "verify-otp"),
    onSuccess: ({ data }) => {
      saveToken("access", data.access);
      saveToken("refresh", data.refresh);
      if (data.role === "merchant") {
        router.replace("/merchant");
      } else if (data.role === "superuser") {
        router.replace("/superuser");
      } else {
        router.replace("/");
      }
      toast.success(data.message);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await checkUidTokenAndResendOtp(uid, token, "verify-otp");
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
        Verify your account
      </h3>
      <p className="mb-6 text-red-500 font-medium text-base">
        We have sent the verification code to your email
      </p>
      <form
        noValidate
        className="mb-10"
        onSubmit={handleSubmit((data) => {
          verifyOtp.mutate(data);
        })}
      >
        <div key={"otp"} className="space-y-1 mb-8">
          <Label htmlFor={"otp"} className={errors["otp"] && "text-red-500"}>
            Enter (OTP)
          </Label>
          <Input
            autoFocus
            type="text"
            id="otp"
            {...register("otp")}
            className={errors["otp"] && "border-red-500"}
          />
          {errors["otp"] && (
            <p className="text-red-500 text-xs">
              {errors["otp"].message?.toString()}
            </p>
          )}
        </div>
        <div className="flex justify-center ">
          <Button
            disabled={
              verifyOtp.isPending || resendOtp.isPending 
            }
            type="submit"
          >
            {verifyOtp.isPending ? (
              <>
                <RotateCwIcon className="rotate-icon" />
                <span className="animate-pulse">Verifying OTP...</span>
              </>
            ) : (
              "Verify OTP"
            )}
          </Button>
        </div>
      </form>
      <Button
        type="button"
        variant={"link"}
        disabled={
          verifyOtp.isPending || resendOtp.isPending || resendOtp.isSuccess
        }
        className={resendOtp.isPending ? "animate-pulse" : ""}
        onClick={() => {
          resendOtp.mutate();
        }}
      >
        Resend OTP
      </Button>
    </>
  );
};

export default VerifyOtp;
