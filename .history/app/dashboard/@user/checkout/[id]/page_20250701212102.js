import UserForm from "@/components/UserForm";
import { mongoDb } from "@/utils/connectDB";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { auth } from "@/auth";
import CreatePaymentLinkForm from "@/components/CreatePaymentLinkForm";
import { Booking } from "@/models/Booking";

export default async function checkoutUserPage(props) {
  const session = await auth();

  const params = await props.params;
  const bookId = await params.id;
 

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return <p className="text-red-500">Invalid ID!</p>;
  }
  const booking = await Booking.findOne({_id: bookId}).lean();

  if (!booking) {
    return <p className="text-red-500">User not found!</p>;
  }

  return (
    <>
      <CreatePaymentLinkForm />
    </>
  );
}
