

import React from 'react';
import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFormations } from '../../src/hooks/useFormations';

function wrapper({ children }: { children: React.ReactNode }) {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe('useFormations', () => {
  it('retourne un tableau', () => {
    const { result } = renderHook(() => useFormations(), { wrapper });
    expect(Array.isArray(result.current)).toBe(true);
  });
});
