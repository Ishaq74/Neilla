
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Index from '../../src/pages/Index';

describe('Index', () => {
  it('affiche le titre principal', () => {
    render(<Index />);
    expect(screen.getByText(/maquillage professionnel/i)).toBeInTheDocument();
  });
});
