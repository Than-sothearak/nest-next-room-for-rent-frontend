'use client';

import LoginForm from '@/components/LoginForm';
import React, { Suspense } from 'react';


export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading login page...</div>}>
      <LoginForm />
    </Suspense>
  );
}
