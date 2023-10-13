"use client";

import { User } from "@prisma/client";

import Button from "@/app/components/Button";
import LoadingModal from "@/app/components/modals/LoadingModal";
import useActiveList from "@/app/hooks/useActiveList";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Modal from "@/app/components/modals/Modal";

interface ProfileProps {
  user?: User;
}

function formatJoinDate(date: Date | undefined) {
  if (!(date instanceof Date)) {
    return "Joined awhile ago";
  }

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `Joined since ${day}/${month}/${year}`;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const router = useRouter();
  const { members } = useActiveList();
  const [isOpenImage, setIsOpenImage] = useState(false);
  const [imgSource, setImgSource] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const isActive = members.indexOf(user?.email!) !== -1;

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", { userId: user?.id })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [user, router]);

  const handleClickImage = useCallback(
    (source: string) => {
      setImgSource(source);
      setIsOpenImage(!isOpenImage);
    },
    [isOpenImage]
  );

  const handleCloseImage = useCallback(() => {
    setIsOpenImage(!isOpenImage);
  }, [isOpenImage]);

  return (
    <div className="w-full h-full z-10 dark:bg-zinc-800 bg-white">
      <div className="flex flex-item flex-col items-center gap-4 pt-10 dark:bg-zinc-800 bg-white">
        {isLoading && <LoadingModal />}
        <Modal isOpen={isOpenImage} onClose={handleCloseImage}>
          <Image
            src={imgSource}
            alt="Avatar"
            width={500}
            height={500}
            className="object-cover"
          />
        </Modal>
        <div
          className="
        relative 
        inline-block 
        rounded-full 
        overflow-hidden
        h-60 
        w-60
        md:h-60 
        md:w-60
      "
        >
          <Image
            fill
            onClick={
              user?.profileImage
                ? () => handleClickImage(user?.profileImage!)
                : () => {}
            }
            className="object-cover cursor-pointer"
            src={user?.profileImage || "/images/placeholder.jpg"}
            alt="Avatar"
          />
        </div>
        {isActive ? (
          <span
            className="
            absolute 
            block 
            rounded-full 
            bg-green-500 
            dark:bg-green-400
            ring-2 
            ring-white 
            dark:ring-black
            top-0 
            right-0
            h-2 
            w-2 
            md:h-3 
            md:w-3
          "
          />
        ) : null}
        <h1 className="text-5xl font-extrabold">{user?.name || ""}</h1>
        <p>{user?.quote || ""}</p>
        <p className="text-sm italic text-gray-400">
          {formatJoinDate(user?.createdAt)}
        </p>
        <Button onClick={handleClick}>
          {user?.name ? `Chat with ${user.name.split(" ")[0]} now` : "Chat now"}
        </Button>

        {user?.images.length ? (
          <p className="text-lg font-bold self-start ml-4">
            {user?.name}&#x27;s highlight photos:{" "}
          </p>
        ) : null}

        <div className="grid grid-cols-3 gap-4 items-center p-4">
          {user?.images
            ? user?.images.map((image) => (
                <Image
                  onClick={() => handleClickImage(image || "")}
                  key={image}
                  src={image}
                  alt={`Highlight image ${image}`}
                  width={500}
                  height={500}
                  className="object-cover cursor-pointer"
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
