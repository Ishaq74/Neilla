import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ThemeToggle from '../../src/components/ThemeToggle';

describe('ThemeToggle', () => {
  it('affiche le bouton de changement de thème', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
