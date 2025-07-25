'use client';

import { useEffect, useRef } from 'react';

import Loader from '@/components/ui/Loader/Loader';

type InfinityScrollWrapperProps = {
  children: React.ReactNode;
  onLoadMore: () => void;
  additionalConditions?: boolean;
};

function InfinityScrollWrapper({
  children,
  onLoadMore,
  additionalConditions = true,
}: InfinityScrollWrapperProps) {
  const observerTargetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = observerTargetRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && additionalConditions) {
          onLoadMore();
        }
      },
      { threshold: 1 },
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [additionalConditions, onLoadMore]);

  return (
    <>
      {children}
      <div ref={observerTargetRef} />
      {additionalConditions && (
        <div>
          <Loader />
        </div>
      )}
    </>
  );
}

export default InfinityScrollWrapper;
