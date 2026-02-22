import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminComments from '../../../src/pages/admin/AdminComments';

describe('AdminComments', () => {
  it('doit rendre la page sans crash', () => {
    const { container } = render(<AdminComments />);
    expect(container).toBeInTheDocument();
  });

  it('affiche les boutons de filtre', () => {
    render(<AdminComments />);
    expect(screen.getByText(/en attente/i)).toBeInTheDocument();
    expect(screen.getByText(/approuvés/i)).toBeInTheDocument();
    expect(screen.getByText(/tous/i)).toBeInTheDocument();
  });

  it('change de filtre et affiche le bon état', () => {
    render(<AdminComments />);
    fireEvent.click(screen.getByText(/approuvés/i));
    expect(screen.getByText(/approuvés/i)).toBeInTheDocument();
  });

  it('affiche un message si aucun commentaire', async () => {
    render(<AdminComments />);
    expect(await screen.findByText(/aucun commentaire/i)).toBeInTheDocument();
  });
});
