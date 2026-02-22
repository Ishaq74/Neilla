import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useToast } from '../../src/hooks/use-toast';


describe('useToast', () => {
  it('doit retourner un objet avec une fonction toast', () => {
    const { result } = renderHook(() => useToast());
    expect(typeof result.current.toast).toBe('function');
  });

  it('peut afficher un toast simple', () => {
    const { result } = renderHook(() => useToast());
    const toastFn = result.current.toast;
    expect(() => toastFn('Message')).not.toThrow();
  });

  it('gère un toast avec options', () => {
    const { result } = renderHook(() => useToast());
    const toastFn = result.current.toast;
    expect(() => toastFn({ title: 'Titre', description: 'Desc', action: undefined })).not.toThrow();
  });

  it('ne plante pas si appelé sans argument', () => {
    const { result } = renderHook(() => useToast());
    const toastFn = result.current.toast;
    expect(() => toastFn()).not.toThrow();
  });
});
