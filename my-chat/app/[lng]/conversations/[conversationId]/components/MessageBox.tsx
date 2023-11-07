"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FullMessageType } from "@/app/types";

import Avatar from "@/app/components/Avatar";
import ImageModal from "./ImageModal";
import { useTranslation } from "@/app/i18n";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
  lng: string;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast, lng }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [transition, setTransition] = useState<any>();
  
  useEffect(() => {
    useTranslation(lng, "convo-body").then((t) => {
      setTransition(t);
    });
  }, [lng]);

  const isOwn = session.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn
      ? "bg-sky-500 text-white dark:bg-sky-400"
      : "bg-gray-100 dark:bg-gray-800",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {data.sender.name}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        <div className={message}>
          <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data.image ? (
            <Image
              alt="Image"
              height="288"
              width="288"
              onClick={() => setImageModalOpen(true)}
              src={data.image}
              className="
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
              "
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div
            className="
            text-xs 
            font-light 
            text-gray-500
            dark:text-gray-400
            "
          >
            {`${transition?.t("seen-by") || ""} ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
