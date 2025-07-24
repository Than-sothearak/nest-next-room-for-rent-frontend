'use client';

import { useState } from "react";
import { BiDownload } from "react-icons/bi";

export default function DownloadInvoiceButton({ bookingId,fileName }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleDownload = async () => {
    setIsLoading(true);
    const res = await fetch('/api/invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId }),
    });

    if (!res.ok) {
      alert('Failed to generate invoice');
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; // You can make this dynamic too
    link.click();
    URL.revokeObjectURL(url);
     setIsLoading(false);
  };

  return (
  
      <button
      onClick={handleDownload}
      disabled={isLoading}
      className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <BiDownload />
    </button>

  );
}