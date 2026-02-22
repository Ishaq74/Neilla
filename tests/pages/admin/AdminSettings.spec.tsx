import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminSettings from '../../../src/pages/admin/AdminSettings';

describe('AdminSettings', () => {
  it('doit rendre la page sans crash', () => {
    const { container } = render(<AdminSettings />);
    expect(container).toBeInTheDocument();
  });

  it('affiche les onglets principaux', () => {
    render(<AdminSettings />);
    expect(screen.getByText(/général/i)).toBeInTheDocument();
    expect(screen.getByText(/apparence/i)).toBeInTheDocument();
  });

  it('change d’onglet et affiche le contenu', () => {
    render(<AdminSettings />);
    fireEvent.click(screen.getByText(/apparence/i));
    expect(screen.getByText(/thème/i)).toBeInTheDocument();
  });

  it('affiche un message si aucun réglage', async () => {
    render(<AdminSettings />);
    expect(await screen.findByText(/aucun réglage trouvé/i)).toBeInTheDocument();
  });
});
