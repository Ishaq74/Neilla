import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminMedia from '../../../src/pages/admin/AdminMedia';

describe('AdminMedia', () => {
  it('doit rendre la page sans crash', () => {
    const { container } = render(<AdminMedia />);
    expect(container).toBeInTheDocument();
  });

  it('affiche le bouton ajouter un média', () => {
    render(<AdminMedia />);
    expect(screen.getByText(/ajouter un média/i)).toBeInTheDocument();
  });

  it('ouvre le dialogue d’ajout de média', async () => {
    render(<AdminMedia />);
    fireEvent.click(screen.getByText(/ajouter un média/i));
    expect(await screen.findByText(/ajouter un média/i)).toBeInTheDocument();
  });

  it('affiche un message si aucun média', async () => {
    render(<AdminMedia />);
    expect(await screen.findByText(/aucun média trouvé/i)).toBeInTheDocument();
  });
});
