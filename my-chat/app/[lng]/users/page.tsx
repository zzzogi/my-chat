import EmptyState from "../../components/EmptyState";

const Users = () => {
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <EmptyState type="users" />
    </div>
  );
};

export default Users;
