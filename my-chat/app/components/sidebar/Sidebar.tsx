import getCurrentUser from "@/app/actions/getCurrentUser";

import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";
import ActiveStatus from "../ActiveStatus";

async function Sidebar({
  children,
  lng,
}: {
  children: React.ReactNode;
  lng: string;
}) {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full ">
      <ActiveStatus />
      <DesktopSidebar currentUser={currentUser!} lng={lng} />
      <MobileFooter lng={lng} />
      <main className="lg:pl-20 h-full ">{children}</main>
    </div>
  );
}

export default Sidebar;
