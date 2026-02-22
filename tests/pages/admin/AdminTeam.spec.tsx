import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminTeam from '../../../src/pages/admin/AdminTeam';

describe('AdminTeam', () => {
  it('rendu sans crash', () => {
    render(<AdminTeam />);
  });

  it('affiche le bouton nouveau membre', () => {
    render(<AdminTeam />);
    expect(screen.getByText(/nouveau membre/i)).toBeInTheDocument();
  });

  it('ouvre le dialogue de création de membre', async () => {
    render(<AdminTeam />);
    fireEvent.click(screen.getByText(/nouveau membre/i));
    expect(await screen.findByText(/nouveau membre/i)).toBeInTheDocument();
  });

  it('valide le formulaire vide et affiche une erreur', async () => {
    render(<AdminTeam />);
    fireEvent.click(screen.getByText(/nouveau membre/i));
    fireEvent.click(screen.getByText(/ajouter/i));
    await waitFor(() => {
      expect(screen.getByLabelText(/nom affiché/i)).toBeInvalid();
    });
  });

  it('affiche un message si aucun membre', async () => {
    render(<AdminTeam />);
    expect(await screen.findByText(/aucun membre trouvé/i)).toBeInTheDocument();
  });
});
