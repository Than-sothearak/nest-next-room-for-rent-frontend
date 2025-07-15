'use client';

import React, { Suspense } from 'react';
import LoginForm from './LoginForm'; // separate client component with useSearchParams

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading login page...</div>}>
      <LoginForm />
    </Suspense>
  );
}
