import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useToast } from '../../src/hooks/use-toast';

describe('useToast', () => {
  it('retourne une fonction toast', () => {
    const { result } = renderHook(() => useToast());
    expect(typeof result.current).toBe('function');
  });
});
