"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { forgotPasswordSchema, TForgotPasswordSchema } from "./form-data";
import { zodResolver } from "@hookform/resolvers/zod";
import Label from "../ui/label";
import Input from "../ui/input";
import Button from "../ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordSubmit } from "../backend/auth-api";
import { toast } from "sonner";
import { RotateCwIcon } from "lucide-react";

const ForgotPasswordForm = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TForgotPasswordSchema) => forgotPasswordSubmit(data),
    onSuccess: ({ data }) => {
      toast.success(
        "Password reset email has been sent. Please check your inbox."
      );
      router.replace(`/auth/sign-in/${data.role}`);
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
      <div key={"username"} className="space-y-1 mb-8">
        <Label
          htmlFor={"username"}
          className={errors["username"] && "text-red-500"}
        >
          Username or email
        </Label>
        <Input
          autoFocus
          type="text"
          id="username"
          {...register("username")}
          className={errors["username"] && "border-red-500"}
        />
        {errors["username"] && (
          <p className="text-red-500 text-xs">
            {errors["username"].message?.toString()}
          </p>
        )}
      </div>
      <div className="flex justify-center ">
        <Button disabled={isPending} type="submit">
          {isPending ? (
            <>
              <RotateCwIcon className="rotate-icon" />
              <span className="animate-pulse">Sending reset link ...</span>
            </>
          ) : (
            "Send reset link"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
