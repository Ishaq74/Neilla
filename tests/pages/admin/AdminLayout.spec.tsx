import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminLayout from '../../../src/components/admin/AdminLayout';

describe('AdminLayout', () => {
  it('affiche le titre et la description', () => {
    render(
      <AdminLayout title="Test" description="Desc">
        <div>Contenu enfant</div>
      </AdminLayout>
    );
    expect(screen.getByText(/test/i)).toBeInTheDocument();
    expect(screen.getByText(/desc/i)).toBeInTheDocument();
    expect(screen.getByText(/contenu enfant/i)).toBeInTheDocument();
  });
});
