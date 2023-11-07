import Sidebar from "@/app/components/sidebar/Sidebar";
import UserList from "./components/UserList";

export default function UsersLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <Sidebar lng={lng}>
      <UserList lng={lng} />
      <div className="h-full bg-white dark:bg-zinc-800">{children}</div>
    </Sidebar>
  );
}
