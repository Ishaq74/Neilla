import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminFormations from '../../../src/pages/admin/AdminFormations';

describe('AdminFormations', () => {
  it('doit rendre la page sans crash', () => {
    const { container } = render(<AdminFormations />);
    expect(container).toBeInTheDocument();
  });

  it('affiche le bouton nouvelle formation', () => {
    render(<AdminFormations />);
    expect(screen.getByText(/nouvelle formation/i)).toBeInTheDocument();
  });

  it('ouvre le dialogue de création de formation', async () => {
    render(<AdminFormations />);
    fireEvent.click(screen.getByText(/nouvelle formation/i));
    expect(await screen.findByText(/nouvelle formation/i)).toBeInTheDocument();
  });

  it('valide le formulaire vide et affiche une erreur', async () => {
    render(<AdminFormations />);
    fireEvent.click(screen.getByText(/nouvelle formation/i));
    fireEvent.click(screen.getByText(/créer/i));
    await waitFor(() => {
      expect(screen.getByLabelText(/titre/i)).toBeInvalid();
    });
  });

  it('affiche un message si aucune formation', async () => {
    render(<AdminFormations />);
    expect(await screen.findByText(/aucune formation enregistrée/i)).toBeInTheDocument();
  });
});
