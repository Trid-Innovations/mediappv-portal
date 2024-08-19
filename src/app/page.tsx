'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

import { getParamValueFromUrl } from '../../utils';

export default function Page(): never {
  useEffect(() => {
    const returnUrl = getParamValueFromUrl('returnUrl');
    const cost = getParamValueFromUrl('cost');
    const providerId = getParamValueFromUrl('providerId');
    const articleLink = getParamValueFromUrl('articleLink');
    localStorage.setItem('returnUrl', returnUrl);
    localStorage.setItem('articleLink', articleLink);
    localStorage.setItem('providerId', providerId);
    localStorage.setItem('cost', cost);
    // Redirect to /dashboard while keeping the query parameters
    redirect(`/dashboard`);
  }, []);

  // This return is only necessary to satisfy TypeScript,
  // it will never actually render anything because of the redirect
  return undefined as never;
}
