import EmptyState from "../../components/EmptyState";

interface UsersProps {
  params: {
    lng: string;
  };
}

const Users = ({ params }: UsersProps) => {
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <EmptyState type="users" lng={params.lng} />
    </div>
  );
};

export default Users;
