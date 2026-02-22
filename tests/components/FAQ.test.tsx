
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FAQ from '../../src/components/FAQ';

describe('FAQ', () => {
  it('affiche le titre et au moins une question', () => {
    render(<FAQ />);
    expect(screen.getByText(/questions fréquentes/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });
});
