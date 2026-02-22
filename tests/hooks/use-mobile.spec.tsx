
import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useIsMobile } from '../../src/hooks/use-mobile';

// Mock global window.matchMedia pour tous les tests de ce fichier
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
  it('retourne un booléen', () => {
    const { result } = renderHook(() => useIsMobile());
    expect(typeof result.current).toBe('boolean');
  });
});
