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
