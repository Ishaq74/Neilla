

import React from 'react';
import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSiteContent } from '../../src/hooks/useSiteContent';

function wrapper({ children }: { children: React.ReactNode }) {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe('useSiteContent', () => {
  it('retourne un objet', () => {
    const { result } = renderHook(() => useSiteContent('home', 'services_intro'), { wrapper });
    expect(typeof result.current).toBe('object');
  });
});
