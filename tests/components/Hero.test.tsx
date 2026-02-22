
import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Hero from '../../src/components/Hero';

vi.mock('../../src/hooks/useSiteContent', () => ({
  useSiteContent: () => ({
    data: {
      hero: {
        title: 'Test Titre',
        title_highlight: 'Test Highlight',
        subtitle: 'Test sous-titre',
        badge: 'Test badge',
        cta_primary: 'CTA Principal',
        cta_secondary: 'CTA Secondaire',
      }
    }
  })
}));

describe('Hero', () => {
  it('affiche le titre, le badge et le sous-titre', () => {
    render(<Hero />);
    expect(screen.getByText(/Test Titre/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Highlight/i)).toBeInTheDocument();
    expect(screen.getByText(/Test badge/i)).toBeInTheDocument();
    expect(screen.getByText(/Test sous-titre/i)).toBeInTheDocument();
  });

  it('affiche les boutons CTA', () => {
    render(<Hero />);
    expect(screen.getByText(/CTA Principal/i)).toBeInTheDocument();
    expect(screen.getByText(/CTA Secondaire/i)).toBeInTheDocument();
  });

  it('affiche 5 étoiles', () => {
    render(<Hero />);
    expect(screen.getAllByLabelText(/étoiles?/i).length).toBeGreaterThanOrEqual(1);
  });
});
