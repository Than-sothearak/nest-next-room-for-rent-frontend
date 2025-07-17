'use client'

import { useEffect, useState } from 'react';

export default function CheckTransaction({ tranId }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tranId) return;

    const checkTransaction = async () => {
      setLoading(true);
      setError(null);
      setStatus(null);

      try {
        const res = await fetch('/api/payway/check-transaction-2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ tran_id: tranId })
        });

        const data = await res.json();

        if (res.ok) {
          setStatus(data?.payment_status|| 'UNKNOWN');
        } else {
          setError(data.error || 'Unknown error');
        }
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    checkTransaction();
  }, [tranId]);

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-2">Auto-Check Transaction</h2>

      <div className="mb-2 text-sm text-gray-700">
        <strong>Transaction ID:</strong> {tranId}
      </div>

      {loading && (
        <div className="text-blue-500 font-semibold">Checking...</div>
      )}

    {status && (
  <div className="mt-2 text-green-600 font-semibold">
    ✅ Status: {status}<br />
    💰 Amount: {data.data?.total_amount} USD<br />
    🕒 Date: {data.data?.transaction_date}
  </div>
)}

      {error && (
        <div className="mt-2 text-red-600">
          ❌ Error: {typeof error === 'string' ? error : error.message}
        </div>
      )}
    </div>
  );
}
