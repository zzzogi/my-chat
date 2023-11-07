import getCurrentUser from "@/app/actions/getCurrentUser";

import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

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
      <DesktopSidebar currentUser={currentUser!} lng={lng} />
      <MobileFooter lng={lng} />
      <main className="lg:pl-20 h-full ">{children}</main>
    </div>
  );
}

export default Sidebar;
