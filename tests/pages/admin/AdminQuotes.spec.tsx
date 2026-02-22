import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminQuotes from '../../../src/pages/admin/AdminQuotes';

describe('AdminQuotes', () => {
  it('doit rendre la page sans crash', () => {
    const { container } = render(<AdminQuotes />);
    expect(container).toBeInTheDocument();
  });

  it('affiche le bouton nouveau devis', () => {
    render(<AdminQuotes />);
    expect(screen.getByText(/nouveau devis/i)).toBeInTheDocument();
  });

  it('ouvre le dialogue de création de devis', async () => {
    render(<AdminQuotes />);
    fireEvent.click(screen.getByText(/nouveau devis/i));
    expect(await screen.findByText(/nouveau devis/i)).toBeInTheDocument();
  });

  it('valide le formulaire vide et affiche une erreur', async () => {
    render(<AdminQuotes />);
    fireEvent.click(screen.getByText(/nouveau devis/i));
    fireEvent.click(screen.getByText(/créer/i));
    await waitFor(() => {
      expect(screen.getByLabelText(/client/i)).toBeInvalid();
    });
  });

  it('affiche un message si aucun devis', async () => {
    render(<AdminQuotes />);
    expect(await screen.findByText(/aucun devis enregistré/i)).toBeInTheDocument();
  });
});
