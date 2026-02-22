import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from '../../src/components/About';

describe('About', () => {
  it('affiche le titre et le texte principal', () => {
    render(<About />);
    expect(screen.getByText(/notre histoire/i)).toBeInTheDocument();
    expect(screen.getByText(/artisan/i)).toBeInTheDocument();
  });
});
