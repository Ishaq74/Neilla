import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminReservations from '../../../src/pages/admin/AdminReservations';

describe('AdminReservations', () => {
  it('doit rendre la page sans crash', () => {
    const { container } = render(<AdminReservations />);
    expect(container).toBeInTheDocument();
  });
  it('affiche le bouton nouvelle réservation', () => {
    render(<AdminReservations />);
    expect(screen.getByText(/nouvelle réservation/i)).toBeInTheDocument();
  });

  it('ouvre le dialogue de création de réservation', async () => {
    render(<AdminReservations />);
    fireEvent.click(screen.getByText(/nouvelle réservation/i));
    expect(await screen.findByText(/créez une nouvelle réservation/i)).toBeInTheDocument();
  });

  it('valide le formulaire vide et affiche une erreur', async () => {
    render(<AdminReservations />);
    fireEvent.click(screen.getByText(/nouvelle réservation/i));
    fireEvent.click(screen.getByText(/créer/i));
    await waitFor(() => {
      expect(screen.getByLabelText(/client/i)).toBeInvalid();
    });
  });

  it('affiche un message si aucune réservation', async () => {
    render(<AdminReservations />);
    expect(await screen.findByText(/aucune réservation trouvée/i)).toBeInTheDocument();
  });
});
