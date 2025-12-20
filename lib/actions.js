// // src/lib/actions.ts
// 'use server';

// import { redirect } from 'next/navigation';

// export async function authenticate(
//   prevState,
//   formData
// ) {
//   const email = formData.get('email');
//   const password = formData.get('password');
//   const redirectTo = formData.get('redirectTo');

//   const res = await fetch('http://localhost:3000/auth/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     credentials: 'include',
//     body: JSON.stringify({ email, password }),
//   });

//   if (!res.ok) {
//     return 'Invalid email or password';
//   }

//   console.log(res);


//   // ✅ JWT cookie already set by NestJS
//   // redirect(redirectTo);
// }
