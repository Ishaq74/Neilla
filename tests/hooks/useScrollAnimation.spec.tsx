import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useScrollAnimation } from '../../src/hooks/useScrollAnimation';

describe('useScrollAnimation', () => {
  it('retourne un objet', () => {
    const { result } = renderHook(() => useScrollAnimation());
    expect(typeof result.current).toBe('object');
  });
});
