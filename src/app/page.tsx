'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

import { getReturnUrlFromUrl } from '../../utils';

export default function Page(): never {
  useEffect(() => {
    const returnUrl = getReturnUrlFromUrl();
    if (returnUrl) {
      localStorage.setItem('returnUrl', returnUrl);
    }
    redirect(`/dashboard`);
  }, []);

  return undefined as never;
}
