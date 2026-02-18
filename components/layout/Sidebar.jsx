import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import SideBarMain from "./SideBarMain";

export default async function Sidebar({ navigation, servicesCount, link }) {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;
  const data = await fetch(
    `${process.env.BASE_URL}/users/${userId}`,

  ).then(res => {
    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }
    return res.json();
  });
  const user = JSON.parse(JSON.stringify(data));
  return (
    <>
      <SideBarMain
        link={link}
        servicesCount={servicesCount}
        navigation={navigation}
        user={user}
      />
    </>
  );
}
