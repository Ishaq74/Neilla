import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminInvoices from '../../../src/pages/admin/AdminInvoices';

describe('AdminInvoices', () => {
  it('rendu sans crash', () => {
    render(<AdminInvoices />);
  });

  it('affiche le bouton nouvelle facture', () => {
    render(<AdminInvoices />);
    expect(screen.getByText(/nouvelle facture/i)).toBeInTheDocument();
  });

  it('ouvre le dialogue de création de facture', async () => {
    render(<AdminInvoices />);
    fireEvent.click(screen.getByText(/nouvelle facture/i));
    expect(await screen.findByText(/nouvelle facture/i)).toBeInTheDocument();
  });

  it('valide le formulaire vide et affiche une erreur', async () => {
    render(<AdminInvoices />);
    fireEvent.click(screen.getByText(/nouvelle facture/i));
    fireEvent.click(screen.getByText(/enregistrer/i));
    await waitFor(() => {
      expect(screen.getByLabelText(/client/i)).toBeInvalid();
    });
  });

  it('affiche un message si aucune facture', async () => {
    render(<AdminInvoices />);
    expect(await screen.findByText(/aucune facture/i)).toBeInTheDocument();
  });
});
