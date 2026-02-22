import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminServices from '../../../src/pages/admin/AdminServices';

describe('AdminServices', () => {
  it('doit rendre la page sans crash', () => {
    const { container } = render(<AdminServices />);
    expect(container).toBeInTheDocument();
  });

  it('affiche le bouton nouveau service', () => {
    render(<AdminServices />);
    expect(screen.getByText(/nouveau service/i)).toBeInTheDocument();
  });

  it('ouvre le dialogue de création de service', async () => {
    render(<AdminServices />);
    fireEvent.click(screen.getByText(/nouveau service/i));
    expect(await screen.findByText(/nouveau service/i)).toBeInTheDocument();
  });

  it('valide le formulaire vide et affiche une erreur', async () => {
    render(<AdminServices />);
    fireEvent.click(screen.getByText(/nouveau service/i));
    fireEvent.click(screen.getByText(/créer/i));
    await waitFor(() => {
      expect(screen.getByLabelText(/nom/i)).toBeInvalid();
    });
  });

  it('affiche un message si aucun service', async () => {
    render(<AdminServices />);
    expect(await screen.findByText(/aucun service enregistré/i)).toBeInTheDocument();
  });
});
