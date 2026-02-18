import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserForm from "@/components/(users)/UserForm";
import { getServerSession } from "next-auth";

export default async function addUserPage() {
   const session = await getServerSession(authOptions)
   if (!session?.user) {
    return "Access Denied";
   }
  return (
    <UserForm session={session}/>
  );
}
