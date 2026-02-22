import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AnimatedSection from '../../src/components/AnimatedSection';

describe('AnimatedSection', () => {
  it('rend le composant sans crash', () => {
    render(<AnimatedSection>Contenu test</AnimatedSection>);
    expect(screen.getByText(/Contenu test/i)).toBeInTheDocument();
  });
});
