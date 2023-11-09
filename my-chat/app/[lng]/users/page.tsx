import EmptyState from "../../components/EmptyState";

const Users = ({ lng }: { lng: string }) => {
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <EmptyState type="users" lng={lng} />
    </div>
  );
};

export default Users;
