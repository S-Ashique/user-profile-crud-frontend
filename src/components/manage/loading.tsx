import { CameraIcon, UserRoundIcon } from "lucide-react";

export const AuthLoading = () => {
  return <div>AuthLoading</div>;
};



export const UserProfileLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center  animate-pulse">
      <div className="size-36 bg-stone-200 rounded-full  relative flex justify-center mb-4">
        <UserRoundIcon className="size-32" />
        <div className="size-8 bg-stone-300  rounded-full absolute -bottom-2 inline-flex justify-center items-center">
          <CameraIcon className="size-4" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 mb-8 *:animate-pulse">
        <div className="bg-stone-200 w-36 h-7 rounded-md"></div>
        <div className="bg-stone-200 w-40 h-7 rounded-md"></div>
      </div>
      <div className="flex gap-4 flex-wrap justify-center *:animate-pulse ">
        <div className="bg-stone-200 max-sm:w-40 w-52 h-7 rounded-lg"></div>
        <div className="bg-stone-200 max-sm:w-40 w-52 h-7 rounded-lg"></div>
        <div className="bg-stone-200 w-52 h-7 rounded-lg"></div>
      </div>
    </div>
  );
};

