import UserForm from "@/components/UserForm";
import { getSession } from "next-auth/react";

export default async function addUserPage() {
  const session = await getSession(); // Assume getSession is defined elsewhere
 
  return (
    <UserForm session={session}/>
  );
}
