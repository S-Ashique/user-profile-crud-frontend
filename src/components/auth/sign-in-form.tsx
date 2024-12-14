"use client";

import React, { useState } from "react";
import { signInFormFields, signInSchema, TSignInSchema } from "./form-data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Button from "../ui/button";
import Label from "../ui/label";
import Input from "../ui/input";
import { saveToken, ShowPassword } from ".";
import { TRoleParams } from "../types";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authSubmit } from "../backend/auth-api";
import { toast } from "sonner";
import { RotateCwIcon } from "lucide-react";

const SignInForm = ({ role }: TRoleParams) => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  const changeVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { isPending, mutate } = useMutation({
    mutationFn: (data: TSignInSchema) => authSubmit(data, role, "sign-in"),
    onSuccess: ({ data }) => {
      if (data.pos === false) {
        toast.error(
          "You do not have the required permissions to access this role."
        );
      } else if (data.not_verified) {
        toast.error(
          "Your account has not been verified. A verification email has been sent to your inbox. Please check your email."
        );
      } else if (data.is_blocked) {
        toast.error("Your account has been blocked.");
      } else {
        saveToken("access", data.access);
        saveToken("refresh", data.refresh);
        if (pathname.includes("auth")) {
          const path = role === "user" ? "/" : role;
          router.replace(`/${path}`);
        } else {
          router.refresh();
        }
      }
    },
  });

  return (
    <form
      noValidate
      className="mb-10"
      onSubmit={handleSubmit((data) => {
        mutate(data);
      })}
    >
      {signInFormFields.map(({ name, type, label }) => (
        <div key={name} className="space-y-1 mb-6">
          <Label htmlFor={name} className={errors[name] && "text-red-500"}>
            {label}
          </Label>
          <Input
            autoFocus={name === "username"}
            id={name}
            type={type === "password" ? (showPassword ? "text" : type) : type}
            {...register(name)}
            className={errors[name] && "border-red-500"}
          />
          {errors[name] && (
            <p className="text-red-500 text-xs">
              {errors[name].message?.toString()}
            </p>
          )}
        </div>
      ))}
      <div className="flex items-center justify-between mb-8">
        <ShowPassword onClick={changeVisibility} show={showPassword} />
        <Link href={"/auth/forgot-password"} className="link">
          Forgot your password?
        </Link>
      </div>
      <div className="flex justify-center ">
        <Button disabled={isPending} type="submit">
          {isPending ? (
            <>
              <RotateCwIcon className="rotate-icon" />
              <span className="animate-pulse">Sign In ...</span>
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
