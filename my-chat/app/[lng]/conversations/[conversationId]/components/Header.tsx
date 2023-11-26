"use client";

import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { IoCall } from "react-icons/io5";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Conversation, User } from "@prisma/client";

import useOtherUser from "@/app/hooks/useOtherUser";
import useActiveList from "@/app/hooks/useActiveList";

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
  const isActive = members.indexOf(otherUser?.email!) !== -1;

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

  function mypopup() {
    const mywindow = window.open(
      `http://localhost:3000/${lng}/room/1`,
      "mywindow",
      "location=1,status=1,scrollbars=1,  width=1200,height=600"
    );
    mywindow?.moveTo(120, 120);
  }

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
        <div className="flex gap-2">
          <IoCall
            size={24}
            className="
              text-sky-500
              cursor-pointer
              hover:text-sky-600
              dark:text-sky-400
              dark:hover:text-sky-500
              transition
            "
            onClick={() => mypopup()}
          />
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
      </div>
    </>
  );
};

export default Header;
