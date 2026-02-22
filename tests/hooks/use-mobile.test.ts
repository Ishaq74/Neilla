

import { beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useIsMobile } from '../../src/hooks/use-mobile';

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

describe('useIsMobile', () => {
  beforeEach(() => {
    window.innerWidth = 1024;
  });

  it('doit retourner un booléen', () => {
    const { result } = renderHook(() => useIsMobile());
    expect(typeof result.current).toBe('boolean');
  });

  it('retourne true si largeur < 768px', () => {
    window.innerWidth = 500;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('retourne false si largeur >= 768px', () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('réagit au resize (mobile -> desktop)', () => {
    window.innerWidth = 500;
    const { result, rerender } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
    window.innerWidth = 1024;
    window.dispatchEvent(new Event('resize'));
    rerender();
    expect(result.current).toBe(false);
  });

  it('nettoie le listener au démontage', () => {
    // On espionne matchMedia pour vérifier le nettoyage
    const mql = window.matchMedia(`(max-width: 767px)`);
    const spy = vi.spyOn(mql, 'removeEventListener');
    const { unmount } = renderHook(() => useIsMobile());
    unmount();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
