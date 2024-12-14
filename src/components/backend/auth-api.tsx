import axios, { AxiosError } from "axios";
import {
  TChangePasswordSchema,
  TForgotPasswordSchema,
  TSignInSchema,
  TSignUpSchema,
  TVerifyOtpSchema,
} from "../auth/form-data";
import { TRoleParams } from "../types";
import { toast } from "sonner";

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export const axiosApi = axios.create({
  baseURL,
});

export const errorHandle = (error: AxiosError) => {
  if (error.response && error.response.data) {
    const errorMessages = Object.values(error.response.data).join(" \n");
    toast.error(errorMessages);
  } else {
    toast.error("Network Error: Unable to process your request at the moment.");
  }
};

export const authSubmit = async (
  formData: TSignUpSchema | TSignInSchema,
  role: TRoleParams["role"],
  type: "sign-up" | "sign-in"
) => {
  try {
    const response = await axiosApi.post(`auth/${type}/${role}/`, formData);
    return response;
  } catch (error) {
    errorHandle(error as AxiosError);
    throw error;
  }
};

export const checkUidTokenAndResendOtp = async (
  uid: string,
  token: string,
  link: "verify-otp" | "resend-otp" | "reset-password"
) => {
  try {
    const response = await axiosApi.get(`auth/${link}/${uid}/${token}/`);
    return response;
  } catch (error) {
    errorHandle(error as AxiosError);
    throw error;
  }
};

export const otpandPasswordResetSubmit = async (
  uid: string,
  token: string,
  formData: TVerifyOtpSchema | TChangePasswordSchema,
  link: "verify-otp" | "reset-password"
) => {
  try {
    const response = await axiosApi.post(
      `auth/${link}/${uid}/${token}/`,
      formData
    );
    return response;
  } catch (error) {
    errorHandle(error as AxiosError);
    throw error;
  }
};

export const forgotPasswordSubmit = async (formData: TForgotPasswordSchema) => {
  try {
    const response = await axiosApi.post("auth/forgot-password/", formData);
    return response;
  } catch (error) {
    errorHandle(error as AxiosError);
    throw error;
  }
};
