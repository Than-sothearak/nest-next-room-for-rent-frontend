"use client";

import { createBooking, updateBooking } from "@/actions/Booking";
import { useActionState, useEffect, useState } from "react";
import ChooseFile from "./ChooseFile";
import { formatDateForForm } from "@/utils/formatDate";
import { BiTrash } from "react-icons/bi";
import { useRouter } from "next/navigation";
import toast, { CheckmarkIcon, Toaster } from "react-hot-toast";
import { FaFile } from "react-icons/fa";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import AddPropertyFormBooking from "./AddPropertyFormBooking";

export default function BookingForm({
  users,
  invoices,
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
    formatDateForForm(booking?.startDate) || ""
  );
  const [endDate, setEndDate] = useState(
    formatDateForForm(booking?.dueDate) || ""
  );
  const [rent, setRent] = useState(booking?.rent ?? "");
  const [deposit, setDeposit] = useState(booking?.deposit ?? "");
  const [status, setStatus] = useState(booking?.status || "active");

  // ✅ Payment + Telegram states
  const [paymentStatus, setPayment] = useState(booking?.paymentStatus || "unpaid");
  const [invoiceSent, setInvoiceSent] = useState(Boolean(booking?.invoiceSent) || false);
  const [telegramStatus, setTelegramStatus] = useState(
    booking?.telegramStatus || "not_sent" // not_sent | queued | sent | failed
  );
  const [sendTelegram, setSendTelegram] = useState(false); // action toggle on submit

  const [notes, setNotes] = useState(booking?.notes || "");
  const [parking, setParking] = useState(booking?.parking?.slot || "");
  const [qty, setQty] = useState(booking?.parking?.size || "");

  // Totals (optionally include add-on properties)
  const propertiesTotal = (formData.properties || []).reduce((sum, p) => {
    const price = Number(p?.price || 0);
    const q = Number(p?.qty || 0);
    return sum + (isFinite(price * q) ? price * q : 0);
  }, 0);

  const calculateTotal = () => {
    // First invoice: monthly rent + deposit + add-ons (simple and predictable)
    const rentNum = Number(rent || 0);
    const depNum = Number(deposit || 0);
    return (isFinite(rentNum) ? rentNum : 0) + (isFinite(depNum) ? depNum : 0) + propertiesTotal;
  };

  const handleRemoveImage = (index) => {
    setFormData((prevFormData) => {
      const removedFile = prevFormData.fileUrls[index];
      return {
        ...prevFormData,
        fileUrls: prevFormData.fileUrls.filter((_, i) => i !== index),
        removedFiles: [...(prevFormData.removedFiles || []), removedFile],
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
    setFormData((prev) => ({
      ...prev,
      fileUrls: booking?.files || [],
    }));
  }, [booking]);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
    } else if (state?.errors) {
      toast.error(state.message);
    }
  }, [state]);

  // Helper for colored select text
  const paymentColor =
    paymentStatus === "paid"
      ? "text-green-600"
      : paymentStatus === "partial"
      ? "text-amber-600"
      : "text-red-600";

  const telegramColor =
    telegramStatus === "sent"
      ? "text-green-600"
      : telegramStatus === "queued"
      ? "text-blue-600"
      : telegramStatus === "failed"
      ? "text-red-600"
      : "text-gray-700";

  return (
    <div>
      {state?.success && (
        <div className="">
          <div className="bg-black/50 w-full h-full fixed inset-0 z-10"></div>
          <div className="z-20 bg-primary border shadow-md flex items-center justify-center fixed px-10 py-8 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-md">
            <div className="flex gap-4 flex-col justify-center items-center w-full">
              <CheckmarkIcon size={28} />
              <p className="w-full text-green-500 text-center">
                {state?.message}
              </p>
              <span>Invoice No: {String(state?.invoiceId).padStart(5, 0)}</span>
              <div className="flex justify-between gap-2">
                <Link
                  href="/dashboard/booking"
                  className="whitespace-nowrap flex items-center gap-2 bg-blue-500 p-2 rounded-md text-primary w-full justify-center"
                >
                  <IoArrowForward />
                  Go to Book page
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <form action={action} className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
        <Toaster position="top-center" />

        {/* LEFT COLUMN */}
        <div className="space-y-4 bg-white shadow p-4 rounded-xl">
          <h2 className="text-xl font-semibold">
            {booking?._id ? "Edit Booking" : "Create Booking"} · Invoice:{" "}
            {booking
              ? String(booking?.invoiceId).padStart(5, "0")
              : String(invoices + 1).padStart(5, "0")}
          </h2>

          {/* USER */}
          <div className="grid gap-2">
            <label className="font-bold">
              User phone number <span className="font-normal">(required)</span>
            </label>
            <select
              name="userId"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="border rounded p-2 bg-gray-100"
              required
            >
              <option value="">Select user</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.phone}
                </option>
              ))}
            </select>
          </div>

          {/* ROOM */}
          <div className="grid gap-2">
            <label className="font-bold">
              Room available <span className="font-normal">(required)</span>
            </label>
            <select
              name="roomId"
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="border rounded p-2 bg-gray-100"
              required
            >
              {oneRoom ? (
                <option value={oneRoom?._id}>{oneRoom?.roomName}</option>
              ) : (
                <option value="">Select room</option>
              )}
              {rooms
                .filter((r) => r.status === 1)
                .map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.name || r.roomName}
                  </option>
                ))}
            </select>
          </div>

          {/* CONTRACT */}
          <div className="grid gap-2">
            <label className="font-bold">Contract</label>
            <select
              name="contract"
              value={contract}
              onChange={(e) => setContract(e.target.value)}
              className="border rounded p-2 bg-gray-100"
            >
              <option value="">Select months</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} month{i > 0 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* DATES */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="font-bold">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded p-2 bg-gray-100"
              />
            </div>
            <div className="grid gap-2">
              <label className="font-bold">End Date</label>
              <input
                type="date"
                name="dueDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded p-2 bg-gray-100"
              />
            </div>
          </div>

          {/* RENT & DEPOSIT */}
          <div className="flex gap-4">
            <input
              type="number"
              name="rent"
              placeholder="Rent"
              value={rent}
              onChange={(e) => setRent(e.target.value === "" ? "" : Number(e.target.value))}
              className="border rounded p-2 w-full bg-gray-100"
            />
            <input
              type="number"
              name="deposit"
              placeholder="Deposit"
              value={deposit}
              onChange={(e) => setDeposit(e.target.value === "" ? "" : Number(e.target.value))}
              className="border rounded p-2 w-full bg-gray-100"
            />
          </div>

          {/* TOTALS */}
          <div className="grid gap-2">
            <label className="font-bold">Items total (services)</label>
            <input
              type="text"
              value={propertiesTotal.toFixed(2)}
              disabled
              className="border rounded p-2 bg-gray-100"
            />
            <label className="font-bold">First invoice total</label>
            <input
              type="text"
              value={calculateTotal().toFixed(2)}
              disabled
              className="border rounded p-2 bg-gray-100"
            />
          </div>

          {/* BOOKING STATUS */}
          <div className="grid gap-2">
            <label className="font-bold">Booking status</label>
            <select
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded p-2 bg-gray-100"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          {/* PARKING */}
          <div className="p-4 bg-primary rounded-xl">
            <label className="font-bold">Parking</label>
            <div className="flex gap-4 mt-2">
              <select
                className="border rounded p-2 bg-gray-100"
                name="parking"
                value={parking}
                onChange={(e) => setParking(e.target.value)}
              >
                <option value={""}>N/A</option>
                <option value="car">Car</option>
                <option value="motobike">Motobike</option>
              </select>
              <input
                placeholder="Qty"
                name="parkingSize"
                type="number"
                onChange={(e) => setQty(e.target.value)}
                value={qty}
                className="border rounded p-2 bg-gray-100"
              />
            </div>
          </div>

          {/* PROPERTIES / ADD-ONS */}
          <AddPropertyFormBooking formData={formData} setFormData={setFormData} />

          {/* BILLING (Payment + Telegram) */}
          <div className="p-4 bg-white rounded-xl shadow border space-y-3">
            <h3 className="font-semibold text-lg">Billing</h3>

            {/* Payment Status */}
            <div className="grid gap-1">
              <label className="font-bold">Payment status</label>
              <select
                name="paymentStatus"
                value={paymentStatus}
                onChange={(e) => setPayment(e.target.value)}
                className={`border rounded p-2 bg-gray-100 ${paymentColor}`}
              >
                <option className="text-black" value="unpaid">Unpaid</option>
                <option className="text-black" value="partial">Partial</option>
                <option className="text-black" value="paid">Paid</option>
              </select>
              <p className="text-xs text-gray-500">
                Mark as <b>Paid</b> once payment is confirmed.
              </p>
            </div>

            {/* Invoice Sent (boolean) */}
            <div className="grid gap-1">
              <label className="font-bold">Invoice sent</label>
              <select
                name="invoiceSent"
                value={String(invoiceSent)}
                onChange={(e) => setInvoiceSent(e.target.value === "true")}
                className="border rounded p-2 bg-gray-100"
              >
                <option className="text-black" value="false">No</option>
                <option className="text-black" value="true">Yes</option>
              </select>
              {/* Hidden boolean-safe field if your server prefers explicit true/false */}
              <input type="hidden" name="invoiceSentBool" value={invoiceSent ? "true" : "false"} />
            </div>

            {/* Telegram Status + Send toggle */}
            {/* <div className="grid gap-1">
              <label className="font-bold">Telegram status</label>
              <select
                name="telegramStatus"
                value={telegramStatus}
                onChange={(e) => setTelegramStatus(e.target.value)}
                className={`border rounded p-2 bg-gray-100 ${telegramColor}`}
              >
                <option className="text-black" value="not_sent">Not sent</option>
                <option className="text-black" value="queued">Queued</option>
                <option className="text-black" value="sent">Sent</option>
                <option className="text-black" value="failed">Failed</option>
              </select>
              <p className="text-xs text-gray-500">
                Status is updated by your system after attempting to send.
              </p>
            </div> */}

            {/* <div className="flex items-center gap-2">
              <input
                id="sendTelegram"
                type="checkbox"
                checked={sendTelegram}
                onChange={(e) => setSendTelegram(e.target.checked)}
                className="w-4 h-4 accent-blue-600"
              />
              <label htmlFor="sendTelegram" className="text-sm">
                Send invoice via Telegram on submit
              </label>

              <input type="hidden" name="sendTelegram" value={sendTelegram ? "true" : "false"} />
            </div> */}
          </div>

          {/* FILE ATTACHMENT */}
          <div className="border p-4 rounded-md bg-white shadow-sm">
            <h3 className="font-bold">Attachment file</h3>
            {formData.fileUrls?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border p-2 rounded mt-2 bg-gray-50"
              >
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
                  className="text-red-500"
                >
                  <BiTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="p-4 bg-primary rounded-xl">
            <ChooseFile files={files} setFiles={setFiles} />
          </div>

          {/* NOTES */}
          <div className="grid gap-2">
            <label className="font-bold">Notes</label>
            <textarea
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="border rounded p-2 w-full bg-gray-100"
              placeholder="Notes (optional)"
            />
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isPending}
          className={`p-2 bg-blue-600 text-secondarytext w-full mb-4 rounded-md ${
            isPending ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-500"
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
    </div>
  );
}
