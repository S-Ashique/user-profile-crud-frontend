import Profile from "@/components/profile";
import { Suspense } from "react";

const UserProfile = () => {
  return (
    <>
      <Suspense>
        <Profile role={"user"} />
      </Suspense>
    </>
  );
};

export default UserProfile;
