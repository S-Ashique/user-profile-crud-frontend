"use client";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React, { useRef, useState } from "react";
import Button from "../ui/button";
import {
  ChevronLeftIcon,
  ImageIcon,
  RotateCwIcon,
  SaveIcon,
  TrashIcon,
} from "lucide-react";
import Picture from "./picture";
import { TUpdateUserProfileData } from "../types";

type TProps = {
  close: () => void;
  profile_picture: string;
  updateUserProfile: UseMutationResult<
    AxiosResponse<{ message: string }, Error>,
    Error,
    TUpdateUserProfileData,
    unknown
  >;
};

const ProfilePicture = ({
  close,
  profile_picture,
  updateUserProfile,
}: TProps) => {
  const [picture, setPicture] = useState<File | null>();
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <h3 className="mb-10 auth-heading auth-gradient-heading">
        Change profile picture
      </h3>
      <div className="mb-6 gap-3 flex justify-center flex-wrap">
        <Button
          variant={"ghost"}
          disabled={updateUserProfile.isPending}
          onClick={close}
        >
          <ChevronLeftIcon /> Back
        </Button>
        {profile_picture && (
          <Button
            variant={"destructive"}
            disabled={updateUserProfile.isPending}
            onClick={() => {
              updateUserProfile.mutate({ remove_profile_picture: true });
            }}
          >
            <TrashIcon /> Remove
          </Button>
        )}

        <Button
          variant={"ghost"}
          disabled={updateUserProfile.isPending}
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          <ImageIcon />
          New
        </Button>
        {picture && (
          <Button
            variant={"ghost"}
            disabled={updateUserProfile.isPending}
            onClick={() => {
              const data = new FormData();
              data.append("profile_picture", picture);
              updateUserProfile.mutate(data);
            }}
          >
            {updateUserProfile.isPending ? (
              <>
                <RotateCwIcon className="rotate-icon" /> Saving
              </>
            ) : (
              <>
                <SaveIcon /> Save
              </>
            )}
          </Button>
        )}
      </div>

      {error && (
        <p className="font-medium text-red-500 mb-4 text-center">{error}</p>
      )}

      <input
        className="hidden"
        ref={inputRef}
        type="file"
        accept="image/jpeg, image/webp, image/img,image/png,"
        onChange={(e) => {
          setError("");
          const file = e.target.files && e.target.files[0];
          if (file) {
            if (file.size > 2 * 1024 * 1024) {
              setError("Select a photo that is less than 2mb");
              return;
            }
          }
          setPicture(file);
        }}
      />

      <div className="size-80 sm:size-96 mx-auto rounded-full overflow-hidden shadow-xl">
        <Picture
          profile_picture={
            picture ? URL.createObjectURL(picture) : profile_picture
          }
        />
      </div>
    </>
  );
};

export default ProfilePicture;
