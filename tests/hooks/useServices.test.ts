
import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useServices } from '../../src/hooks/useServices';

function wrapper({ children }: { children: React.ReactNode }) {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}


describe('useServices', () => {
  it('doit retourner un tableau de services', () => {
    const { result } = renderHook(() => useServices(), { wrapper });
    expect(Array.isArray(result.current)).toBe(true);
  });

  it('retourne les données statiques en cas d erreur', async () => {
    vi.spyOn(require('@/lib/apiServices'), 'getServices').mockImplementation(() => { throw new Error('fail'); });
    const { result } = renderHook(() => useServices());
    expect(Array.isArray(result.current)).toBe(true);
    expect(result.current.length).toBeGreaterThan(0);
    vi.restoreAllMocks();
  });

  it('retourne des services avec les champs attendus', () => {
    const { result } = renderHook(() => useServices());
    if (result.current.length > 0) {
      expect(result.current[0]).toHaveProperty('id');
      expect(result.current[0]).toHaveProperty('name');
    }
  });
});
