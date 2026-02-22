import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminDashboard from '../../../src/pages/admin/AdminDashboard';

describe('AdminDashboard', () => {
  it('doit rendre la page sans crash', () => {
    const { container } = render(<AdminDashboard />);
    expect(container).toBeInTheDocument();
  });

  it('affiche les statistiques principales', () => {
    render(<AdminDashboard />);
    expect(screen.getByText(/statistiques/i)).toBeInTheDocument();
    expect(screen.getByText(/clients/i)).toBeInTheDocument();
    expect(screen.getByText(/chiffre d’affaires/i)).toBeInTheDocument();
  });

  it('affiche un message si aucune donnée', async () => {
    render(<AdminDashboard />);
    expect(await screen.findByText(/aucune donnée/i)).toBeInTheDocument();
  });
});
