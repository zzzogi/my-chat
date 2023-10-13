const EmptyState = ({ type = "" }: { type?: string }) => {
  return (
    <div
      className="
        px-4 
        py-10 
        sm:px-6 
        lg:px-8 
        lg:py-6 
        h-full 
        flex 
        justify-center 
        items-center 
        bg-gray-100
        dark:bg-zinc-600
      "
    >
      <div className="text-center items-center flex flex-col">
        <h3
          className="mt-2 text-2xl font-semibold dark:bg-zinc-600
          dark:text-gray-100
        "
        >
          {type === "users"
            ? "Search for a user to start a conversation"
            : "Select a chat or start a new conversation"}
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
