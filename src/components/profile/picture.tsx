import { UserRoundIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const Picture = ({ profile_picture }: { profile_picture: string }) => {
  return (
    <>
      {profile_picture ? (
        <Image
          alt="profile picture"
          src={profile_picture}
          width={500}
          height={300}
          className="size-full object-cover object-center"
          priority={true}
        />
      ) : (
        <UserRoundIcon className="size-full" />
      )}
    </>
  );
};

export default Picture;
