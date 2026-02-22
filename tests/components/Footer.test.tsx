
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

describe('Footer', () => {
  it('affiche le nom du site et le slogan', () => {
    render(<Footer />);
    expect(screen.getByText(/Artisan Beauty/i)).toBeInTheDocument();
    expect(screen.getByText(/L'artisane de votre beauté/i)).toBeInTheDocument();
  });

  it('affiche les liens réseaux sociaux', () => {
    render(<Footer />);
    expect(screen.getByLabelText(/instagram/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/facebook/i)).toBeInTheDocument();
  });

  it('affiche les sections de services et contact', () => {
    render(<Footer />);
    expect(screen.getByRole('navigation', { name: /nos services/i })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /contact/i })).toBeInTheDocument();
  });

  it('affiche l’année courante', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(year.toString())).toBeInTheDocument();
  });
});
