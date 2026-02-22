
import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFormations } from '../../src/hooks/useFormations';

function wrapper({ children }: { children: React.ReactNode }) {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}


describe('useFormations', () => {
  it('doit retourner un tableau de formations', () => {
    const { result } = renderHook(() => useFormations(), { wrapper });
    expect(Array.isArray(result.current)).toBe(true);
  });

  it('retourne les données statiques en cas d erreur', async () => {
    // Mock getFormations pour lancer une erreur
    vi.spyOn(require('@/lib/apiFormations'), 'getFormations').mockImplementation(() => { throw new Error('fail'); });
    const { result } = renderHook(() => useFormations());
    expect(Array.isArray(result.current)).toBe(true);
    expect(result.current.length).toBeGreaterThan(0);
    vi.restoreAllMocks();
  });

  it('retourne des formations avec les champs attendus', () => {
    const { result } = renderHook(() => useFormations());
    if (result.current.length > 0) {
      expect(result.current[0]).toHaveProperty('id');
      expect(result.current[0]).toHaveProperty('title');
    }
  });
});
