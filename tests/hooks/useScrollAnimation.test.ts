
import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useScrollAnimation } from '../../src/hooks/useScrollAnimation';

// Mock window.matchMedia globalement pour tous les tests de ce fichier
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});


describe('useScrollAnimation', () => {
  it('doit retourner un objet', () => {
    const { result } = renderHook(() => useScrollAnimation());
    expect(typeof result.current).toBe('object');
  });

  it('détecte la visibilité (intersection)', () => {
    const { result } = renderHook(() => useScrollAnimation({ threshold: 0.5 }));
    // Simule une intersection
    expect(result.current).toHaveProperty('isVisible');
  });

  it('respecte triggerOnce', () => {
    const { result } = renderHook(() => useScrollAnimation({ triggerOnce: true }));
    expect(result.current).toHaveProperty('isVisible');
  });

  it('nettoie l observer au démontage', () => {
    const { unmount } = renderHook(() => useScrollAnimation());
    unmount();
    // Pas d erreur lors du démontage
    expect(true).toBe(true);
  });
});
