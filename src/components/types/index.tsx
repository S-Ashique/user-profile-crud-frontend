import { TChangePasswordSchema } from "../auth/form-data";

export type TChildren = { children: React.ReactNode };

export type TSignUpFormFields = {
  name: "username" | "email" | "password" | "confirm_password";
  type: string;
  label: string;
};

export type TRoleParams = {
  role: "merchant" | "superuser" | "user";
};

export type TUidTokenParams = {
  uid: string;
  token: string;
};

export type TSignInFormFields = {
  name: "username" | "password";
  type: string;
  label: string;
};

export type TChangePasswordFields = {
  name: "password" | "confirm_password";
  type: string;
  label: string;
};

export type Ttoken = {
  exp?: number;
  is_blocked?: boolean;
} & TRoleParams;

export type TModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  variant?: "NavbarVariant" | "ModalVariant";
};

export type TUpdateUserProfileData =
  | {
      remove_profile_picture: boolean;
    }
  | FormData
  | TChangePasswordSchema;
