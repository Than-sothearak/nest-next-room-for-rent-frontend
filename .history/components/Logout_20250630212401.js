import { handleSignOut } from "@/actions/signout";
import { GoSignOut } from "react-icons/go";
const Logout = () => {
  return (
    <form action={handleSignOut} className="bg-slate-200 hover:bg-slate-300  w-full text-center flex gap-2 justify-start items-center border border-slate-300 p-4 rounded-xl cursor-pointer">
      <GoSignOut />
      <button type="submit">Sign out</button>
    </form>
  );
};

export default Logout;