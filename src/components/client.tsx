'use client';

import { useTRPC } from '@/trpc/client';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';

const Client = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.createAI.queryOptions({ text: 'prefetch 1' })
  );

  const { data: data2, isLoading } = useQuery(
    trpc.createAI.queryOptions({ text: 'client' })
  );

  return (
    <>
      <div>{JSON.stringify(data)}</div>
      {isLoading ? <div>Loading...</div> : <div>{JSON.stringify(data2)}</div>}
    </>
  );
};

export default Client;
