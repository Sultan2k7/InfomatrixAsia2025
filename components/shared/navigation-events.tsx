'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { LoadingSkeleton } from './loading-skeleton';

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}${searchParams}`;
    console.log(`Navigation to ${url}`);
    // You can show/hide a loading indicator here
  }, [pathname, searchParams]);

  return null;
}
