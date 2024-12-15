import React from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";

export const saveToken = (name: string, token: string) => {
  Cookies.set(name, token, { secure: true, sameSite: "strict", expires: 90 });
};

export const RemoveToken = () => {
  Cookies.remove("access");
  Cookies.remove("refresh");
};

export const ShowPassword = ({
  onClick,
  show,
}: {
  onClick: () => void;
  show: boolean;
}) => {
  return (
    <button
      type="button"
      className="flex gap-2 items-center group"
      onClick={onClick}
    >
      <span
        className={cn(
          "size-5 inline-flex items-center justify-center  border border-stone-300 group-focus-visible:border-stone-400 group-hover:border-stone-400 rounded-lg group-focus-visible:ring-1 group-focus-visible:ring-offset-2 group-focus-visible:ring-stone-950",
          show && "bg-gradient-to-t from-stone-600 to-stone-950 text-white "
        )}
      >
        {show && <CheckIcon className="size-4" strokeWidth={2} />}
      </span>
      <span className="group-focus-visible:text-stone-950 group-hover:text-stone-950 font-medium leading-none">
        {show ? "Hide" : "Show"} password
      </span>
    </button>
  );
};
