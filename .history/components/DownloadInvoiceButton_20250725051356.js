'use client';

import { useState } from "react";
import { BiDownload } from "react-icons/bi";

export default function DownloadInvoiceButton({ bookingId,fileName }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate invoice');
      }

      const blob = await res.blob();
      console.log(res)
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'invoice.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
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