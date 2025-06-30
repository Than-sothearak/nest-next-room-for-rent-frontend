import SideBarClient from "@/components/SideBarClient";
import { User } from "@/models/User";
import { mongoDb } from "@/utils/connectDB";

export default async function Sidebar({ session ,navigation }) {
  await mongoDb()
   const user = await User.findOne({ _id: session?.user?._id });
  return (
    <>
      <SideBarClient
      navigation={navigation}
        session={session}
        user={JSON.parse(JSON.stringify(user))}
      />
    </>
  );
}
