import Client from '@/components/client';
import { caller, trpc, getQueryClient } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';

const Page = async () => {
  console.log('SERVER COMPONENT');
  const data = await caller.createAI({ text: 'server components' });

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.createAI.queryOptions({ text: 'prefetch 1' })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h1>{JSON.stringify(data)}</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <Client />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
};

export default Page;
