import Sidebar from "@/app/components/sidebar/Sidebar";
import UserList from "./components/UserList";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      <div className="h-full bg-white dark:bg-zinc-800">
        <UserList />
        {children}
      </div>
    </Sidebar>
  );
}
