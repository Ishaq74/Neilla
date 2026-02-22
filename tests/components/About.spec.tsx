import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import About from '../../src/components/About';

describe('About', () => {
  it('affiche le texte principal', () => {
    render(<About />);
    expect(screen.getByText(/haut de gamme/i)).toBeInTheDocument();
  });
});
