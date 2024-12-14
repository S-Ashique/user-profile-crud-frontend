"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signUpFormFields, signUpSchema, TSignUpSchema } from "./form-data";
import Label from "../ui/label";
import Input from "../ui/input";
import { ShowPassword } from ".";
import Link from "next/link";
import Button from "../ui/button";
import { TRoleParams } from "../types";
import { useMutation } from "@tanstack/react-query";
import { authSubmit } from "../backend/auth-api";
import { RotateCwIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignUpForm = ({ role }: TRoleParams) => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const changeVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { isPending, mutate } = useMutation({
    mutationFn: (data: TSignUpSchema) => authSubmit(data, role, "sign-up"),
    onSuccess: () => {
      router.replace(`/auth/sign-in/${role}`);
      toast.success(
        "A verification email has been sent. Please check your inbox."
      );
    },
  });

  return (
    <>
      <form
        noValidate
        className="mb-10"
        onSubmit={handleSubmit((data) => {
          mutate(data);
        })}
      >
        {signUpFormFields.map(({ name, type, label }) => (
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
        <ShowPassword onClick={changeVisibility} show={showPassword} />
        <p className="mt-6 mb-8">
          By creating an account, you agree to the
          <Link href={"/"} className="link mx-2 ">
            Terms of use
          </Link>
          and
          <Link href={"/"} className="link ms-2 ">
            Privacy Policy
          </Link>
        </p>
        <div className="flex justify-center ">
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <RotateCwIcon className="rotate-icon" />
                <span className="animate-pulse">Creating ...</span>
              </>
            ) : (
              "create an account"
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
