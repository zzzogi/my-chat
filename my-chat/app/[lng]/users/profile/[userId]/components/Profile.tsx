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
  lng: string;
}

const Profile: React.FC<ProfileProps> = ({ user, lng }) => {
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
        router.push(`/${lng}/conversations/${data.data.id}`);
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

  const formatJoinDate = useCallback((date: Date | undefined) => {
    if (!(date instanceof Date)) {
      return lng === "en" ? "Joined since" : "Tham gia từ";
    }

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${
      lng === "en" ? "Joined since" : "Tham gia từ"
    } ${day}/${month}/${year}`;
  }, []);

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
        <h1 className="text-5xl font-extrabold">
          {user?.name || "Loading..."}
        </h1>
        <p>{user?.quote || ""}</p>
        <p className="text-sm italic text-gray-400">
          {formatJoinDate(user?.createdAt)}
        </p>
        <Button onClick={handleClick}>
          {user?.name
            ? lng === "en"
              ? `Chat with ${user?.name}`
              : `Nhắn tin với ${user?.name}`
            : lng === "en"
            ? "Chat now"
            : "Nhắn tin"}
        </Button>

        {user?.images.length ? (
          <p className="text-lg font-bold self-start ml-4">
            {lng === "en"
              ? `${user?.name}'s highlight photos:`
              : `Ảnh nổi bật của ${user?.name}:`}
          </p>
        ) : null}

        <div className="grid grid-cols-3 gap-4 items-center p-4">
          {user?.images.length ? (
            user?.images.map((image) => (
              <Image
                onClick={() => handleClickImage(image || "Loading...")}
                key={image}
                src={image}
                alt={`Highlight image ${image}`}
                width={500}
                height={500}
                className="object-cover cursor-pointer"
              />
            ))
          ) : (
            // center the text
            <div className="col-span-full text-center mt-4 text-gray-600 italic">
              {lng === "en"
                ? `${user?.name} has no highlight photos.`
                : `${user?.name} chưa có ảnh nổi bật.`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
