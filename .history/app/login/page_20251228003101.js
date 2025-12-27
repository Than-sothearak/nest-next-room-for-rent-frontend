// 'use client';
// import { useState } from 'react';
// import { useSearchParams, useRouter, redirect } from 'next/navigation';
// import Link from 'next/link';

// export default function LoginPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isPending, setIsPending] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsPending(true);
//     setErrorMessage('');
//     try {
//       const res = await fetch('http://localhost:3000/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include', // ✅ crucial for HttpOnly cookie
//         body: JSON.stringify({ email, password }),
//       });
      
//       if (!res.ok) {
//         const data = await res.json();
//         setErrorMessage(data.message || 'Invalid email or password');
//         setIsPending(false);
      
//         return;
//       }

      
//     } catch (err) {
//       console.error(err);
//       setErrorMessage('An error occurred. Please try again.');
//     } finally {
//       setIsPending(false);
//     }
//   };

//   return (
//     <div className="flex flex-col p-4 gap-8 h-screen w-full justify-center items-center max-md:bg-primary">
//       <div className="bg-primary w-full sm:max-w-md space-y-6 rounded-xl p-8 lg:shadow-lg">
//         <div className="flex flex-col gap-6 text-center">
//           <h1 className="text-2xl font-bold">Login Page</h1>
//           <p>Please login to continue</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-4">
//             <div className="flex flex-col">
//               <label className="font-bold">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 className="w-full p-4 rounded-md bg-secondary"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <div className="flex flex-col">
//               <label className="font-bold">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 className="w-full p-4 rounded-md bg-secondary"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           <input type="hidden" name="redirectTo" value={callbackUrl} />

//           <button
//             type="submit"
//             className={`w-full rounded-lg bg-blue-600 p-3 font-semibold text-white
//               ${isPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
//           >
//             {isPending ? 'Loading...' : 'Login'}
//           </button>

//           {errorMessage && (
//             <p className="text-center text-sm text-red-500">{errorMessage}</p>
//           )}

//           <Link href="/" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
//             ← Back to Home
//           </Link>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      // Show backend error directly
      setError(data.message);
      return;
    }

    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    console.log("SignIn response:", res);
 if (res?.error) {
      // 👇 EXACT backend message
      setError(res.error);
          setLoading(false);
      return;
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}