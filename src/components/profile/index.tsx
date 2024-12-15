"use client";
import React from "react";
import { TRoleParams, TUpdateUserProfileData } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { crudUserProfile } from "../backend/user-api";
import { toast } from "sonner";
import { UserProfileLoading } from "../manage/loading";
import { UserProfileError } from "../manage/errors";
import Picture from "./picture";
import Button from "../ui/button";
import { CameraIcon, LockIcon, LogOutIcon, UserMinusIcon } from "lucide-react";
import Modal from "../ui/modal";
import ProfilePicture from "./profile-picture";
import ChangePassword from "../auth/change-password";
import DeactivateAccount from "./deactivate-account";
import { RemoveToken } from "../auth";

const Profile = ({ role }: TRoleParams) => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const setParams = (name: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("modal", name);
    router.replace(`${pathname}?${params.toString()}`);
  };
  const clearParams = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("modal");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const {
    data: userData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => crudUserProfile("get"),
    retry: 2,
    staleTime: 3 * 60 * 1000,
  });

  const updateUserProfile = useMutation({
    mutationFn: (data: TUpdateUserProfileData) =>
      crudUserProfile("patch", data),
    onSuccess: () => {
      toast.success("updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
      });
      clearParams();
    },
  });

  if (isLoading) return <UserProfileLoading />;
  if (error) return <UserProfileError error={error} role={role} />;
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center mb-8">
          <div className="size-36 flex justify-center mb-6 rounded-full relative ring-1 ring-offset-2 ring-stone-300 hover:ring-stone-400">
            <div className="rounded-full size-full overflow-hidden">
              <Picture profile_picture={userData.profile_picture} />
            </div>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="absolute -bottom-3 rounded-full "
              onClick={() => {
                setParams("profile-photo");
              }}
            >
              <CameraIcon />
            </Button>
          </div>
          <p className="font-medium to-stone-950 sm:text-base mb-2">
            {userData.username}
          </p>
          <p className="font-medium to-stone-950 sm:text-base ">
            {userData.email}
          </p>
        </div>
        <div className="flex justify-center gap-3 flex-wrap">
          <Button
            variant={"ghost"}
            onClick={() => {
              setParams("deactivate-account");
            }}
          >
            <UserMinusIcon />
            Deactivate account
          </Button>
          {role !== "superuser" && (
            <Button
              variant={"ghost"}
              onClick={() => {
                RemoveToken();
                router.replace("/")
              }}
            >
              <LogOutIcon /> Sign out
            </Button>
          )}
          <Button
            variant={"ghost"}
            onClick={() => {
              setParams("change-password");
            }}
          >
            <LockIcon /> Change password
          </Button>
        </div>
      </div>
      <Modal isOpen={searchParams.get("modal") === "profile-photo"}>
        <ProfilePicture
          updateUserProfile={updateUserProfile}
          close={clearParams}
          profile_picture={userData.profile_picture}
        />
      </Modal>

      <Modal isOpen={searchParams.get("modal") === "change-password"}>
        <h3 className="mb-10 auth-heading auth-gradient-heading">
          Change password
        </h3>

        <div className="w-11/12 max-w-md mx-auto">
          <ChangePassword
            changePasswordQuery={updateUserProfile}
            close={clearParams}
            forAuth={false}
          />
        </div>
      </Modal>
      <Modal
        isOpen={
          role !== "superuser" &&
          searchParams.get("modal") === "deactivate-account"
        }
      >
        <DeactivateAccount close={clearParams} />
      </Modal>
    </>
  );
};

export default Profile;
