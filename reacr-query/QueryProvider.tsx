"use client"
import React, { ReactNode } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from '@tanstack/react-query';

interface ReactQueryProviderProps {
  children: ReactNode;
}

export const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({ children }) => {
  // Create the query client with custom configurations
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error:any) => {
        console.error('Query Error:', error);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error:any) => {
        console.error('Mutation Error:', error);
      },
    }),
    defaultOptions: {
      queries: {
        retry: 2, // Retry failed queries up to 2 times
        refetchOnWindowFocus: false, // Disable refetching when window regains focus
        staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
      },
      mutations: {
        retry: 1, // Retry failed mutations once
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
