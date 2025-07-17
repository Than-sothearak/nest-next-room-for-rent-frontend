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
  console.log(data.result.data?.payment_status)
        if (res.ok) {
          setStatus(data.result.data?.payment_status|| 'UNKNOWN');
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
    <div className="">

    {status && (
  <div className="mt-2 text-green-600 font-semibold">
    ✅ Status: {status}<br />
    
  </div>
)}

 
    </div>
  );
}
