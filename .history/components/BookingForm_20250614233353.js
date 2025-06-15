"use client";

import { createBooking, updateBooking } from "@/actions/Booking";
import { useActionState, useEffect, useState } from "react";
import ChooseFile from "./ChooseFile";
import { formatDate } from "@/utils/formatDate";
import { BsFillFileCodeFill } from "react-icons/bs";

export default function BookingForm({
  users,
  rooms,
  booking,
  bookingId,
  oneRoom,
}) {
  const [contract, setContract] = useState(booking?.contract || "");
  const [files, setFiles] = useState([]);
  const [selectedUser, setSelectedUser] = useState(booking?.userId || "");
  const [selectedRoom, setSelectedRoom] = useState(booking?.roomId || "");
  const [startDate, setStartDate] = useState( formatDate(booking?.startDate) || "");
  const [endDate, setEndDate] = useState(formatDate(booking?.endDate) || "");
  const [rent, setRent] = useState(booking?.rent || "");
  const [deposit, setDeposit] = useState(booking?.deposit || "");
  const [status, setStatus] = useState(booking?.status || "");
  const [notes, setNotes] = useState(booking?.notes || "");
  const [attactFiles, setAttactFiles] = ([booking?.files]|| [])


  const calculateTotal = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth()) +
      1;
    return months > 0 ? Number(rent) + Number(deposit) : 0;
  };

  const updateBookingWithId = updateBooking.bind(null, booking?._id);
  const [state, action, isPending] = useActionState(
    booking?._id ? updateBookingWithId : createBooking,
    undefined
  );


  return (
    <form
      action={action}
      className="grid gap-4 max-w-2xl p-4 mt-4 bg-white shadow rounded-xl"
    >
      <h2 className="text-xl font-semibold">Create Booking</h2>

      <div className="grid gap-2">
        <label>User phone number</label>
        <select
          name="userId"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          required
          className="border rounded p-2"
        >
          <option value="">Select user</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.phone}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <label>Room</label>
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
            <option value="">Select room</option>
          )}
          {rooms.map((r) => (
            <option key={r._id} value={r._id}>
              {r.name || r.roomName}
            </option>
          ))}
        </select>
        {state?.errors?.roomId && (
          <p className="text-red-500">{state.errors.roomId}</p>
        )}
      </div>
   <div className="grid gap-2">
        <label>contract</label>
        <select
          name="contract"
          value={contract}
          onChange={(e) => setContract(e.target.value)}
          required
          className="border rounded p-2"
        >
          <option value="">Select months</option>
         
            <option value={1}>
              1 month
            </option>

             <option value={2}>
              2 month
            </option>

            <option value={3}>
              3 month
            </option>

            <option value={4}>
             4 month
            </option>

             <option value={5}>
              5 month
            </option>

            <option value={6}>
              6 month
            </option>

            <option value={7}>
              7 month
            </option>

             <option value={8}>
              8 month
            </option>

            <option value={10}>
              9 month
            </option>
         <option value={11}>
              11 month
            </option>

            <option value={12}>
              12 month
            </option>
        </select>
         {state?.errors?.roomId && (
          <p className="text-red-500">{state.errors.contract}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <label>Start Date</label>
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
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
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

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <label>Monthly Rent ($)</label>
          <input
            type="number"
            name="rent"
            value={rent}
            onChange={(e) => {
              const value = e.target.value;
              setRent(value === "" ? "" : Number(e.target.value));
            }}
            required
            className="border rounded p-2"
          />
          {state?.errors?.rent && (
            <p className="text-red-500">{state.errors.rent}</p>
          )}
        </div>
        <div className="grid gap-2">
          <label>Deposit ($)</label>
          <input
            type="number"
            name="deposit"
            value={deposit}
            onChange={(e) => {
              const value = e.target.value;
              setDeposit(value === "" ? "" : Number(e.target.value));
            }}
            required
            className="border rounded p-2"
          />
          {state?.errors?.deposit && (
            <p className="text-red-500">{state.errors.deposit}</p>
          )}
        </div>
      </div>

      <div className="grid gap-2">
        <label>Total Price</label>
        <input
          type="text"
          value={calculateTotal()}
          disabled
          className="border rounded p-2 bg-gray-100"
        />
      </div>

      <div className="grid gap-2">
        <label className="font-bold">Status</label>
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
<div>
<h1 className="font-bold">Attacment file</h1>
        {attactFiles?.map((item, index) => (
          <div key={index} className="w-full border p-2">
            <BsFillFileCodeFill /> {item}
          </div>

        ))}
</div>
   
      <div className="grid gap-2">
        <label>Notes</label>
        <textarea
          name="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="border rounded p-2"
        />
      </div>
   
      <ChooseFile files={files} setFiles={setFiles} />

      <button
        type="submit"
        disabled={isPending}
        className={`p-2 bg-blue-600 text-secondarytext w-full mt-6 mb-10 hover:bg-blue-500 hover:text-slate-200 rounded-md ${
          isPending ? "opacity-50 cursor-not-allowed" : ""
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
