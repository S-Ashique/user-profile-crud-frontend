import { AxiosError } from "axios";
import { axiosApi, errorHandle } from "./auth-api";
import { TUpdateUserProfileData } from "../types";

export const crudUserProfile = async (
  method: "get" | "delete" | "patch",
  FormData?: TUpdateUserProfileData
) => {
  try {
    if (method === "patch") {
      const { data } = await axiosApi[method]("user-profile/", FormData);
      return data;
    } else {
      const { data } = await axiosApi[method]("user-profile/");
      return data;
    }
  } catch (error) {
    errorHandle(error as AxiosError);
    throw error;
  }
};
