import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/modals/LoadingModal";

interface UserBoxProps {
  data: User;
  lng: string;
}

const UserBox: React.FC<UserBoxProps> = ({ data, lng }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .get(`/api/users/profile/${data.id}`)
      .then((data) => {
        router.push(`users/profile/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="
          w-full 
          relative 
          flex 
          items-center 
          space-x-3 
          bg-white 
          p-3 
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer
          dark:bg-zinc-800
          dark:hover:bg-zinc-700
          mb-2
        "
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {data.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;