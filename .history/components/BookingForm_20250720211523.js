"use client";

import { createBooking, updateBooking } from "@/actions/Booking";
import { useActionState, useEffect, useState } from "react";
import ChooseFile from "./ChooseFile";
import { formatDate } from "@/utils/formatDate";
import AddPropertyForm from "./AddPropertyForm";
import { BiTrash } from "react-icons/bi";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { FaFile } from "react-icons/fa";

export default function BookingForm({
  users,
  rooms,
  booking,
  bookingId,
  oneRoom,
}) {

  const [formData, setFormData] = useState({
    properties: booking?.properties || [],
    fileUrls: booking?.files || [],
  });


  const [contract, setContract] = useState(booking?.contract || "");
  const [files, setFiles] = useState([]);
  const [selectedUser, setSelectedUser] = useState(booking?.userId || "");
  const [selectedRoom, setSelectedRoom] = useState(booking?.roomId || "");
  const [startDate, setStartDate] = useState(
    formatDate(booking?.startDate) || ""
  );
  const [endDate, setEndDate] = useState(formatDate(booking?.dueDate) || "");
  const [rent, setRent] = useState(booking?.rent || "");
  const [deposit, setDeposit] = useState(booking?.deposit || "");
  const [status, setStatus] = useState(booking?.status || "");
  const [notes, setNotes] = useState(booking?.notes || "");
  const [paymentStatus, setPayment] = useState(booking?.paymentStatus || '')
  const [parking, setParking] = useState(booking?.parking?.slot || '')
  const [qty, setQty] = useState(booking?.parking?.size || '')
  const calculateTotal = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth()) +
      1;
    return months > 0 ? Number(rent) + Number(deposit) : 0;
  };

  const handleRemoveImage = (index) => {
    setFormData((prevFormData) => {
      const removedFile = prevFormData.fileUrls[index]; // Get the removed image URL

      return {
        ...prevFormData,
        fileUrls: prevFormData.fileUrls.filter((_, i) => i !== index), // Remove from imageUrls
        removedFiles: [...(prevFormData.removedFiles || []), removedFile], // Store removed image properly
      };

    });

  };


  const updateBookingWithId = updateBooking.bind(null, booking?._id);
  const [state, action, isPending] = useActionState(
    booking?._id ? updateBookingWithId : createBooking,
    undefined
  );

  const router = useRouter();
  useEffect(() => {
    setFormData({
      ...formData,
      fileUrls: booking?.files || [],
    });
  }, [booking]);

  useEffect(() => {
    if (state?.errors || state?.success) {
      const notify = () => toast(state.message);
      notify();
      setFiles([]);
      router.refresh()
    }
  }, [state]);

  return (
    <form
      action={action}
      className="grid grid-cols-2 max-md:grid-cols-1 gap-4  mt-4 "
    >
      {state?.success && (
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            removeDelay: 1000,
            style: {
              background: "oklch(79.2% 0.209 151.711)",
              color: "#fff",
            },
          }}
        />
       
      )}

    
        <div className="bg-primary flex items-center justify-center fixed px-10 py-4 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-md">
          <div className="flex gap-4 flex-col justify-center w-full">
            <p className="w-full">
Booking added successfully!
              {state?.success.message}
            </p>
            <button className="bg-blue-500 p-2 rounded-md">Ok</button>
          </div>
        </div>
    
      {state?.errors && (
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            removeDelay: 1000,
            style: {
              background: "oklch(70.4% 0.191 22.216)",
              color: "#fff",
            },
          }}
        />
      )}
      <div className="space-y-4 bg-white shadow  p-4  rounded-xl">
        <h2 className="text-xl font-semibold">{booking ? "Edit Booking" : "Create Booking"}</h2>

        <div className="grid gap-2">
          <label className="font-bold">User phone number <span className="font-normal">(required)</span></label>
          <select
            name="userId"
            value={selectedUser}
            title={users?.find(u => u._id === selectedUser)?.username || ''}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
            className="border rounded p-2"
          >
            <option value="">Select user</option>
            {users.map((u) => (
              <option key={u._id} value={u._id} title={u.username}>
                {u.phone}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-2">
          <label className="font-bold">Room available  <span className="font-normal">(required)</span></label>
          <select
            name="roomId"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            required
            className="border rounded p-2"
          >
            {state?.errors?.userId && (
              <p className="text-red-500">{state.errors.userId}</p>
            )}
            {oneRoom ? (
              <option value={oneRoom._id}>{oneRoom.roomName}</option>
            ) : (
              booking === "undefined" ? rooms
                .filter((r) => r.status === 1)
                .map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.name || r.roomName}
                  </option>
                )) : rooms
                  .filter((r) => r.status === 1)
                  .map((r) => (
                    <option key={r._id} value={r._id}>
                      {r.name || r.roomName}
                    </option>
                  ))
            )}
          </select>
          {state?.errors?.roomId && (
            <p className="text-red-500">{state.errors.roomId}</p>
          )}
        </div>
        <div className="grid gap-2">
          <label className="font-bold">contract  <span className="font-normal">(required)</span></label>
          <select
            name="contract"
            value={contract}
            onChange={(e) => setContract(e.target.value)}
            required
            className="border rounded p-2"
          >
            <option value="">Select months</option>

            <option value={1}>1 month</option>

            <option value={2}>2 month</option>

            <option value={3}>3 month</option>

            <option value={4}>4 month</option>

            <option value={5}>5 month</option>

            <option value={6}>6 month</option>

            <option value={7}>7 month</option>

            <option value={8}>8 month</option>

            <option value={10}>9 month</option>
            <option value={11}>11 month</option>

            <option value={12}>12 month</option>
          </select>
          {state?.errors?.roomId && (
            <p className="text-red-500">{state.errors.contract}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label className="font-bold">Start Date  <span className="font-normal">(required)</span></label>
            <input
              type="date"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="border rounded p-2"
            />
            {state?.errors?.startDate && (
              <p className="text-red-500">{state.errors.startDate}</p>
            )}
          </div>
          <div className="grid gap-2">
            <label className="font-bold">End Date  <span className="font-normal">(required)</span></label>
            <input
              type="date"
              name="dueDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="border rounded p-2"
            />
            {state?.errors?.endDate && (
              <p className="text-red-500">{state.errors.endDate}</p>
            )}
          </div>
        </div>

        <div className="grid">
          <div className="w-full flex gap-4">
            <div className="w-full">
              <label className="font-bold">Monthly Rent ($)  <span className="font-normal"></span></label>
              <input
                type="number"
                name="rent"
                value={rent}
                onChange={(e) => {
                  const value = e.target.value;
                  setRent(value === "" ? "" : Number(e.target.value));
                }}
                required
                className="w-full border rounded p-2"
              />
              {state?.errors?.rent && (
                <p className="text-red-500">{state.errors.rent}</p>
              )}
            </div>
            <div className="w-full flex flex-col">
              <label className="font-bold">Deposit ($)</label>
              <input
                type="number"
                name="deposit"
                value={deposit}
                onChange={(e) => {
                  const value = e.target.value;
                  setDeposit(value === "" ? "" : Number(e.target.value));
                }}
                required
                className="w-full border rounded p-2"
              />
              {state?.errors?.deposit && (
                <p className="text-red-500">{state.errors.deposit}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          <label className="font-bold">Total Price</label>
          <input
            type="text"
            value={calculateTotal()}
            disabled
            className="border rounded p-2 bg-gray-100"
          />
        </div>

        <div className="grid gap-2">
          <label className="font-bold">Payment status  <span className="font-normal">(required)</span></label>
          <select
            name="paymentStatus"
            value={paymentStatus}
            onChange={(e) => setPayment(e.target.value)}
            required
            className={`border rounded p-2 ${paymentStatus === 'paid' ? 'text-green-500' : 'text-red-500'} `}
          >  <option value="unpaid" className="text-black">Unpaid</option>
            <option value="paid" className="text-black">Paid</option>

          </select>
        </div>

        <div className="grid gap-2">
          <label className="font-bold">Status  <span className="font-normal">(required)</span></label>
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="border rounded p-2"
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-primary rounded-xl">
          <label className="font-bold">Parking</label>
          <div className="w-full flex  items-center gap-4">
            <div className="flex flex-col">
              <label>Select vehicle</label>
              <select className="border rounded p-2" name="parking" value={parking} onChange={(e) => setParking(e.target.value)}>
                <option value={""}>N/A</option>
                <option value="car">Car</option>
                <option value="motobike">Motobike</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label>Qty</label>
              <input
                placeholder="Enter size..."
                name="parkingSize"
                type="number"
                onChange={(e) => setQty(e.target.value)}
                value={qty}
                className="border rounded p-2 "
              />
            </div>
          </div>
        </div>
        <AddPropertyForm formData={formData} setFormData={setFormData} />


        <div className="border p-4 rounded-md">
          <h1 className="font-bold">Attacment file</h1>
          {formData?.removedFiles &&
            formData.removedFiles.map((item, index) => (
              <input
                key={index}
                name="removedFiles"
                type="text"
                defaultValue={item}
                className="w-full p-2 rounded-md bg-secondary text-xs focus:ring-0 focus:outline-none hidden"
              />
            ))}

          {formData.fileUrls.length > 0 ? <div>
            {formData.fileUrls?.map((item, index) => (
              <div key={index} className="w-full flex items-center justify-between gap-2 border p-2 rounded hover:bg-gray-50">
                <a
                  href={item}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <FaFile size={18} />
                  <span className="break-all">{item.split("/").pop()}</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="text-red-500 hover:underline"
                >
                  <BiTrash />
                </button>
              </div>
            ))}
          </div> : <div>No file Attacment</div>}

        </div>

        <div className="p-4 bg-primary rounded-xl ">

          <ChooseFile files={files} setFiles={setFiles} />
        </div>
        <div className="grid gap-2 mt- p-4 bg-primary rounded-xl ">
          <label>Notes  <span className="font-normal">(optional)</span></label>
          <textarea
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="border rounded p-2"
          />

        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={`p-2 bg-blue-600 text-secondarytext w-full mt-6 mb-10 hover:bg-blue-500 hover:text-slate-200 rounded-md ${isPending ? "opacity-50 cursor-not-allowed" : ""
          }`}
      >
        {isPending
          ? booking?._id
            ? "Updating..."
            : "Adding..."
          : booking?._id
            ? "Update"
            : "Create Booking"}
      </button>
    </form>
  );
}
