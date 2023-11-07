import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { signOut } from "next-auth/react";

import useConversation from "./useConversation";

const useRoutes = (lng: string) => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: `/${lng}/conversations`,
        icon: HiChat,
        active: pathname === `/${lng}/conversations` || !!conversationId,
      },
      {
        label: "Users",
        href: `/${lng}/users`,
        icon: HiUsers,
        active: pathname === `/${lng}/users`,
      },
      {
        label: "Logout",
        href: "#",
        icon: HiArrowLeftOnRectangle,
        onClick: () => signOut({ callbackUrl: `/${lng}` }),
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
