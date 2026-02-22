
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../../src/components/Footer';

describe('Footer', () => {
  it('affiche le footer', () => {
    render(<Footer />);
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });
});
