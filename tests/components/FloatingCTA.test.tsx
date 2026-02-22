
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FloatingCTA from '../../src/components/FloatingCTA';

describe('FloatingCTA', () => {
  it('affiche le bouton CTA', () => {
    render(<FloatingCTA />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('gère le clic sur le bouton', () => {
    render(<FloatingCTA />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    // On ne vérifie pas la navigation ici, mais le clic ne doit pas planter
  });
});
