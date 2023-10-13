import getUserById from "@/app/actions/getUserById";
import EmptyState from "@/app/components/EmptyState";
import Profile from "./components/Profile";
import UserList from "../../components/UserList";

interface IParams {
  userId: string;
}

const UserId = async ({ params }: { params: IParams }) => {
  const user = await getUserById(params.userId);

  if (!user) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full dark:bg-zinc-800 bg-white">
      <div className="h-full flex flex-col ">
        <Profile user={user!} />
      </div>
    </div>
  );
};

export default UserId;
