import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SideBarClient from "@/components/Layout/SideBarClient";
import { getServerSession } from "next-auth";

export default async function Sidebar({ navigation,servicesCount, link }) {
 
  const session = await getServerSession(authOptions);
  console.log("Sidebar session:", session.user.id);
  return (
    <>
      <SideBarClient
       link={link}
       servicesCount={servicesCount}
        navigation={navigation}
        // user={JSON.parse(JSON.stringify(user))}
      />
    </>
  );
}
