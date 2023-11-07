import getCurrentUser from "@/app/actions/getCurrentUser";
import getConversations from "../../actions/getConversations";
import getUsers from "../../actions/getUsers";
import Sidebar from "../../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  const conversations = await getConversations();
  const users = await getUsers();
  const currentUser = await getCurrentUser();

  return (
    <Sidebar lng={lng}>
      <div className="h-full bg-white dark:bg-zinc-800 ">
        <ConversationList
          currentUser={currentUser!}
          users={users}
          title="Messages"
          initialItems={conversations}
          lng={lng}
        />
        {children}
      </div>
    </Sidebar>
  );
}
