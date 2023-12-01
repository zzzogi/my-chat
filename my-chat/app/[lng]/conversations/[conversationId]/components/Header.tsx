"use client";

import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";

import useActiveList from "@/app/hooks/useActiveList";
import useOtherUser from "@/app/hooks/useOtherUser";

import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import ProfileDrawer from "./ProfileDrawer";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
  lng: string;
}

const Header: React.FC<HeaderProps> = ({ conversation, lng }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.id!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} ${
        lng === "en" ? "members" : "thành viên"
      }`;
    }

    return isActive
      ? lng === "en"
        ? "Active now"
        : "Đang hoạt động"
      : lng === "en"
      ? "Offline"
      : "Ngoại tuyến";
  }, [conversation, isActive]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        lng={lng}
      />
      <div
        className="
        bg-white 
        dark:bg-zinc-900
        w-full 
        flex 
        border-b-[1px] 
        dark:border-zinc-500
        sm:px-4 
        py-3 
        px-4 
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm
      "
      >
        <div className="flex gap-3 items-center">
          <Link
            href={`/${lng}/conversations`}
            className="
            lg:hidden 
            block 
            text-sky-500 
            hover:text-sky-600 
            dark:text-sky-400
            dark:hover:text-sky-500
            transition 
            cursor-pointer
          "
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div className="flex">
              <div>{conversation.name || otherUser.name}</div>
            </div>
            <div className="text-sm font-light text-neutral-500 dark:text-neutral-400">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="
          text-sky-500
          cursor-pointer
          hover:text-sky-600
          dark:text-sky-400
          dark:hover:text-sky-500
          transition
        "
        />
      </div>
    </>
  );
};

export default Header;
