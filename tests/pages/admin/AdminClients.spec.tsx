import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminClients from '../../../src/pages/admin/AdminClients';
import React from 'react';

describe('AdminClients', () => {
  it('affiche le titre de la page', () => {
    render(<AdminClients />);
    expect(screen.getByText(/gestion des clients/i)).toBeInTheDocument();
  });

  it('affiche le bouton nouveau client', () => {
    render(<AdminClients />);
    expect(screen.getByText(/nouveau client/i)).toBeInTheDocument();
  });

  it('affiche la table des clients', () => {
    render(<AdminClients />);
    expect(screen.getByText(/total clients/i)).toBeInTheDocument();
  });

  it('ouvre le dialogue de création de client', async () => {
    render(<AdminClients />);
    fireEvent.click(screen.getByText(/nouveau client/i));
    expect(await screen.findByText(/ajoutez un nouveau client/i)).toBeInTheDocument();
  });

  it('valide le formulaire vide et affiche une erreur', async () => {
    render(<AdminClients />);
    fireEvent.click(screen.getByText(/nouveau client/i));
    fireEvent.click(screen.getByText(/créer/i));
    // On attend un toast ou une validation, ici on vérifie la présence d'un champ requis
    await waitFor(() => {
      expect(screen.getByLabelText(/prénom/i)).toBeInvalid();
    });
  });

  it('affiche un message si aucun client', async () => {
    render(<AdminClients />);
    expect(await screen.findByText(/aucun client enregistré/i)).toBeInTheDocument();
  });
});
