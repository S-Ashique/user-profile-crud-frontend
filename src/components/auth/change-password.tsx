"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  changePasswordFields,
  changePasswordSchema,
  TChangePasswordSchema,
} from "./form-data";
import { zodResolver } from "@hookform/resolvers/zod";
import Label from "../ui/label";
import Input from "../ui/input";
import { ShowPassword } from ".";
import Button from "../ui/button";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { RotateCwIcon } from "lucide-react";

const ChangePassword = ({
  changePasswordQuery,
}: {
  changePasswordQuery: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    TChangePasswordSchema,
    unknown
  >;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
  });
  const changeVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form
        noValidate
        className="mb-10"
        onSubmit={handleSubmit((data) => {
          changePasswordQuery.mutate(data);
        })}
      >
        {changePasswordFields.map(({ name, type, label }) => (
          <div key={name} className="space-y-1 mb-6">
            <Label htmlFor={name} className={errors[name] && "text-red-500"}>
              {label}
            </Label>
            <Input
              autoFocus={name === "password"}
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
        <div className="flex justify-center mt-8">
          <Button disabled={changePasswordQuery.isPending} type="submit">
            {changePasswordQuery.isPending ? (
              <>
                <RotateCwIcon className="rotate-icon" />
                <span className="animate-pulse">Changing password ...</span>
              </>
            ) : (
              "Reset password"
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

export default ChangePassword;
