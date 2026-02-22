import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminBlogCategories from '../../../src/pages/admin/AdminBlogCategories';

describe('AdminBlogCategories', () => {
  it('doit rendre la page sans crash', () => {
    const { container } = render(<AdminBlogCategories />);
    expect(container).toBeInTheDocument();
  });

  it('affiche le bouton nouvelle catégorie', () => {
    render(<AdminBlogCategories />);
    expect(screen.getByText(/nouvelle catégorie/i)).toBeInTheDocument();
  });

  it('ouvre le dialogue de création de catégorie', async () => {
    render(<AdminBlogCategories />);
    fireEvent.click(screen.getByText(/nouvelle catégorie/i));
    expect(await screen.findByText(/nouvelle catégorie/i)).toBeInTheDocument();
  });

  it('valide le formulaire vide et affiche une erreur', async () => {
    render(<AdminBlogCategories />);
    fireEvent.click(screen.getByText(/nouvelle catégorie/i));
    fireEvent.click(screen.getByText(/créer/i));
    await waitFor(() => {
      expect(screen.getByLabelText(/nom/i)).toBeInvalid();
    });
  });

  it('affiche un message si aucune catégorie', async () => {
    render(<AdminBlogCategories />);
    expect(await screen.findByText(/aucune catégorie trouvée/i)).toBeInTheDocument();
  });
});
