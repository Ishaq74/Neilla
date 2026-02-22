
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Header from '../../src/components/Header';

describe('Header', () => {
  it('affiche le logo et le titre', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/retour à l'accueil/i)).toBeInTheDocument();
    expect(screen.getByText(/Artisan Beauty/i)).toBeInTheDocument();
  });

  it('affiche les liens de navigation principaux', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByText(/Accueil/i)).toBeInTheDocument();
    expect(screen.getByText(/Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Formations/i)).toBeInTheDocument();
    expect(screen.getByText(/Blog/i)).toBeInTheDocument();
    expect(screen.getByText(/Galerie/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });

  it('affiche les boutons Connexion et Inscription si non connecté', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByText(/Connexion/i)).toBeInTheDocument();
    expect(screen.getByText(/Inscription/i)).toBeInTheDocument();
  });

  it('ouvre le menu mobile', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const menuBtn = screen.getByLabelText(/ouvrir le menu/i);
    fireEvent.click(menuBtn);
    expect(screen.getByText(/Menu/i)).toBeInTheDocument();
  });

  // Pour les tests d'état connecté/admin, il faudrait mocker le contexte Auth
});
