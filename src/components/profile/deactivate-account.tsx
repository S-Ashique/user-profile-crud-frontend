import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { crudUserProfile } from "../backend/user-api";
import { RemoveToken } from "../auth";
import { useRouter } from "next/navigation";
import Button from "../ui/button";
import { RotateCwIcon, TrashIcon, XIcon } from "lucide-react";

const DeactivateAccount = ({ close }: { close: () => void }) => {
  const router = useRouter();
  const [inputText, setInputText] = useState("");
  const { isPending, mutate } = useMutation({
    mutationFn: () => crudUserProfile("delete"),
    onSuccess: () => {
      router.replace("/");
      RemoveToken();
    },
  });

  return (
    <>
      <h3 className="mb-10 auth-heading auth-gradient-heading">
        Deactivate your account
      </h3>
      <div className="w-11/12 max-w-md mx-auto text-base">
        <p className="text-lg  mb-4 text-stone-950 font-medium">
          Are you sure you want to proceed?
        </p>
        <p className="text-pretty mb-2">
          This action cannot be undone. It will permanently delete your account
          and remove all associated data from our servers.
        </p>

        <div className="mb-8 flex flex-col items-center text-stone-950">
          <p className="mb-2">
            Please type
            <span className="text-lg font-medium tracking-tight mx-2 text-red-500">
              DELETE ACCOUNT
            </span>
            to confirm
          </p>
          <input
            type="text"
            autoFocus
            name="confirm_delete"
            className=" border-b bg-transparent border-red-500 focus-visible:border-b-2  w-40 text-center "
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        <div className="flex justify-center gap-3">
          <Button disabled={isPending} onClick={close}>
            <XIcon /> Cancel
          </Button>
          <Button
            variant={"destructive"}
            disabled={inputText !== "DELETE ACCOUNT" || isPending}
            onClick={() => mutate()}
          >
            {isPending ? (
              <>
                <RotateCwIcon className="rotate-icon" />
                <span className="animate-pulse">Deleting ...</span>
              </>
            ) : (
              <>
                <TrashIcon /> Confirm
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default DeactivateAccount;
