import SideBarClient from "@/components/SideBarClient";
import { User } from "@/models/User";

export default async function Sidebar({ session ,navigation,servicesCount }) {
   
   const user = await User.findOne({ _id: session?.user?._id });
  if (!user) {
    return <div>User not found</div>;
  }       

  return (
    <>
      <SideBarClient
       servicesCount={servicesCount}
        navigation={navigation}
        session={session}
        user={JSON.parse(JSON.stringify(user))}
      />
    </>
  );
}
