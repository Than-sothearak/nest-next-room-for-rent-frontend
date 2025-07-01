import UserForm from "@/components/UserForm";
import { mongoDb } from "@/utils/connectDB";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { auth } from "@/auth";
import CreatePaymentLinkForm from "@/components/CreatePaymentLinkForm";

export default async function checkoutUserPage(props) {
  const session = await auth();

  const params = await props.params;
  const id = await params.id;
 

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return <p className="text-red-500">Invalid User ID!</p>;
  }
  const user = await User.findOne({_id: id}).lean();

  if (!user) {
    return <p className="text-red-500">User not found!</p>;
  }

  return (
    <>
      <CreatePaymentLinkForm />
    </>
  );
}
