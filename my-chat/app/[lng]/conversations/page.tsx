"use client";

import clsx from "clsx";

import useConversation from "../../hooks/useConversation";
import EmptyState from "../../components/EmptyState";

const Home = ({
  params,
}: {
  params: {
    lng: string;
  };
}) => {
  const { isOpen } = useConversation();

  return (
    <div
      className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState lng={params.lng} />
    </div>
  );
};

export default Home;
