import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const client = new QueryClient();

export default function QueryProvider({ children }: PropsWithChildren) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export const useQueryClient = () => {
  return client;
};
export const useQueryProvider = () => {
  const queryClient = new QueryClient();
  return queryClient;
};
