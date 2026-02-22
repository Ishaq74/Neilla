import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminLogin from '../../../src/pages/admin/AdminLogin';

describe('AdminLogin', () => {
  it('doit rendre la page sans crash', () => {
    const { container } = render(<AdminLogin />);
    expect(container).toBeInTheDocument();
  });

  it('affiche le formulaire de connexion', () => {
    render(<AdminLogin />);
    expect(screen.getByLabelText(/adresse email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
  });

  it('affiche un message d’erreur si champs vides', async () => {
    render(<AdminLogin />);
    fireEvent.click(screen.getByText(/se connecter/i));
    await waitFor(() => {
      expect(screen.getByLabelText(/adresse email/i)).toBeInvalid();
    });
  });

  it('affiche le lien vers la création de compte', () => {
    render(<AdminLogin />);
    expect(screen.getByText(/créer un compte administrateur/i)).toBeInTheDocument();
  });
});
