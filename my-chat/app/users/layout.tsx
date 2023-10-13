import Sidebar from "@/app/components/sidebar/Sidebar";
import UserList from "./components/UserList";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      <UserList />
      <div className="h-full bg-white dark:bg-zinc-800">{children}</div>
    </Sidebar>
  );
}
