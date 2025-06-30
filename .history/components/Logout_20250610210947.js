import { handleSignOut } from "@/actions/signout";
import { GoSignOut } from "react-icons/go";
const Logout = () => {
  return (
    <form action={handleSignOut} className="flex gap-2 justify-start items-center mt-5">
      <GoSignOut />
      <button type="submit">Sign out</button>
    </form>
  );
};

export default Logout;