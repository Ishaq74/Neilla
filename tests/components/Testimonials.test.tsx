import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Testimonials from '../../src/components/Testimonials';

describe('Testimonials', () => {
  it('affiche le titre', () => {
    render(<Testimonials />);
    expect(screen.getByText(/témoignages/i)).toBeInTheDocument();
  });
});
