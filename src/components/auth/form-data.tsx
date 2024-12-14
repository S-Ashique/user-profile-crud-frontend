import { z } from "zod";
import {
  TChangePasswordFields,
  TSignInFormFields,
  TSignUpFormFields,
} from "../types";

export const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_.-]{4,30}$/;
export const emailRegex = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_+=\-[\]{}|\\:;"'<>,.?/~]{8,30}$/;

export const combinedRegex =
  /^(?=.*[a-zA-Z])[a-zA-Z0-9_.-]{4,30}$|^[a-zA-Z0-9._%+-]{4,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const otpRegex = /^\d{6}$/;

export const signUpFormFields: TSignUpFormFields[] = [
  { name: "username", type: "text", label: "What should we call you?" },
  { name: "email", type: "email", label: "What's your email?" },
  { name: "password", type: "password", label: "Create a password" },
  {
    name: "confirm_password",
    type: "password",
    label: "Confirm your password",
  },
];

export const signInFormFields: TSignInFormFields[] = [
  { name: "username", type: "text", label: "Username or email" },
  { name: "password", type: "password", label: "Password" },
];

export const changePasswordFields: TChangePasswordFields[] = [
  { name: "password", type: "password", label: "New password" },
  {
    name: "confirm_password",
    type: "password",
    label: "Confirm your password",
  },
];

export const signUpSchema = z
  .object({
    username: z.string().regex(usernameRegex, {
      message:
        "Username must be 4-30 characters long and contain only alphanumeric characters.",
    }),
    email: z.string().regex(emailRegex, {
      message: "Please enter a valid email address.",
    }),
    password: z.string().regex(passwordRegex, {
      message:
        "Password must be 8-30 characters long and include at least one lowercase letter, one uppercase letter, and one number.",
    }),
    confirm_password: z.string().regex(passwordRegex, {
      message: "Invalid password format.",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message:
      "Passwords don't match. Please make sure both password fields are identical.",
    path: ["confirm_password"],
  });
export type TSignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  username: z.string().regex(combinedRegex, {
    message: "Please provide a valid username or email.",
  }),

  password: z.string().regex(passwordRegex, {
    message:
      "Password must be 8-30 characters long and include at least one lowercase letter, one uppercase letter, and one number.",
  }),
});
export type TSignInSchema = z.infer<typeof signInSchema>;

export const verifyOtpSchema = z.object({
  otp: z.string().regex(otpRegex, {
    message: "Please provide a valid 6-digit OTP.",
  }),
});
export type TVerifyOtpSchema = z.infer<typeof verifyOtpSchema>;

export const forgotPasswordSchema = z.object({
  username: z.string().regex(combinedRegex, {
    message: "Please provide a valid username.",
  }),
});

export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const changePasswordSchema = z
  .object({
    password: z.string().regex(passwordRegex, {
      message:
        "Password must be 8-30 characters long and include at least one lowercase letter, one uppercase letter, and one number.",
    }),
    confirm_password: z.string().regex(passwordRegex, {
      message: "Invalid password format.",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message:
      "Passwords don't match. Please make sure both password fields are identical.",
    path: ["confirm_password"],
  });
export type TChangePasswordSchema = z.infer<typeof changePasswordSchema>;
