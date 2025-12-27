import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SideBarClient from "@/components/Layout/SideBarClient";
import { getServerSession } from "next-auth";

export default async function Sidebar({ navigation,servicesCount, link }) {
 
  const session = await getServerSession(authOptions);
  const userId = session.user.id;

  const findUser = async () => {
    const res = await fetch(
      `${process.env.BASE_URL}/api/users/${userId}`,   

    )}
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
