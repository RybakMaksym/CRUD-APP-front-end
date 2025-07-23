'use client';

import { useEffect, useRef } from 'react';

type InfinityScrollWrapperProps = {
  children: React.ReactNode;
  hasMore: boolean;
  onLoadMore: () => void;
  additionalConditions?: boolean;
};

function InfinityScrollWrapper({
  children,
  hasMore,
  onLoadMore,
  additionalConditions = true,
}: InfinityScrollWrapperProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || !additionalConditions) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0 },
    );

    const el = sentinelRef.current;

    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasMore, additionalConditions, onLoadMore]);

  return (
    <>
      {children}
      <div ref={sentinelRef} style={{ marginTop: '50px' }} />
    </>
  );
}

export default InfinityScrollWrapper;
