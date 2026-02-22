
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FAQ from '../../src/components/FAQ';

describe('FAQ', () => {
  it('affiche une question fréquente', () => {
    render(<FAQ />);
    expect(screen.getByText(/faq/i)).toBeInTheDocument();
  });
});
