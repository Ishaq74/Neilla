
import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSiteContent } from '../../src/hooks/useSiteContent';

function wrapper({ children }: { children: React.ReactNode }) {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe('useSiteContent', () => {
  it('doit retourner un objet de contenu', () => {
    const { result } = renderHook(() => useSiteContent(), { wrapper });
    expect(typeof result.current).toBe('object');
  });
});
