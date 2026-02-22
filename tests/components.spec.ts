import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Hero from '../src/components/Hero';

// Test du Header

describe('Header', () => {
  it('affiche le logo', () => {
    const { getByAltText } = render(<Header />);
    expect(getByAltText(/logo/i)).toBeDefined();
  });
});

// Test du Footer

describe('Footer', () => {
  it('affiche les liens de contact', () => {
    const { getByText } = render(<Footer />);
    expect(getByText(/contact/i)).toBeDefined();
  });
});

// Test du Hero

describe('Hero', () => {
  it('affiche le titre principal', () => {
    const { getByText } = render(<Hero />);
    expect(getByText(/maquillage professionnel/i)).toBeDefined();
  });
});

// Ajoutez d'autres tests pour les composants principaux
