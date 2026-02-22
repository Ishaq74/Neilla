import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminContent from '../../../src/pages/admin/AdminContent';

describe('AdminContent', () => {
  it('doit rendre la page sans crash', () => {
    const { container } = render(<AdminContent />);
    expect(container).toBeInTheDocument();
  });

  it('affiche les onglets principaux', () => {
    render(<AdminContent />);
    expect(screen.getByText(/hero/i)).toBeInTheDocument();
    expect(screen.getByText(/à propos/i)).toBeInTheDocument();
    expect(screen.getByText(/services/i)).toBeInTheDocument();
  });

  it('change d’onglet et affiche le contenu', () => {
    render(<AdminContent />);
    fireEvent.click(screen.getByText(/services/i));
    expect(screen.getByText(/section services/i)).toBeInTheDocument();
  });

  it('affiche un message si aucun contenu', async () => {
    render(<AdminContent />);
    expect(await screen.findByText(/gestion du contenu des pages/i)).toBeInTheDocument();
  });
});
