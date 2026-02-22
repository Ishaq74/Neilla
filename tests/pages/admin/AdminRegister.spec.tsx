import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminRegister from '../../../src/pages/admin/AdminRegister';

describe('AdminRegister', () => {
  it('affiche le formulaire d’inscription', () => {
    render(<AdminRegister />);
    expect(screen.getByText(/créer un compte/i)).toBeInTheDocument();
  });

  it('affiche le bouton de création', () => {
    render(<AdminRegister />);
    expect(screen.getByText(/créer mon compte/i)).toBeInTheDocument();
  });

  it('affiche un message d’erreur si champs vides', async () => {
    render(<AdminRegister />);
    fireEvent.click(screen.getByText(/créer mon compte/i));
    expect(await screen.findByText(/le prénom est requis/i)).toBeInTheDocument();
  });

  it('affiche le lien retour à la connexion', () => {
    render(<AdminRegister />);
    expect(screen.getByText(/retour à la connexion/i)).toBeInTheDocument();
  });
});
