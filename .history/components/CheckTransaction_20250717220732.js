'use client'

import { useState } from 'react';

export default function CheckTransaction() {
  const [tranId, setTranId] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const checkTransaction = async () => {
    if (!tranId) return;

    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      const res = await fetch('/api/payway/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tran_id: tranId })
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(data.result.status);
      } else {
        setError(data.error || 'Unknown error');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-2">Check Transaction</h2>
      <input
        type="text"
        className="w-full border p-2 mb-2"
        placeholder="Enter transaction ID"
        value={tranId}
        onChange={(e) => setTranId(e.target.value)}
      />
      <button
        onClick={checkTransaction}
        disabled={loading || !tranId}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Checking...' : 'Check Status'}
      </button>

      {status && (
        <div className="mt-4 text-green-600 font-semibold">
          Status: {status}
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-600">
          Error: {error.message || error}
        </div>
      )}
    </div>
  );
}
