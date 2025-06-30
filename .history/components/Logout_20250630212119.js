import { handleSignOut } from "@/actions/signout";
import { GoSignOut } from "react-icons/go";
const Logout = () => {
  return (
    <form action={handleSignOut} className="w-full text-center flex gap-2 justify-start items-center border border-slate-200 p-4 rounded-xl hover:bg-primary ">
      <GoSignOut />
      <button type="submit">Sign out</button>
    </form>
  );
};

export default Logout;