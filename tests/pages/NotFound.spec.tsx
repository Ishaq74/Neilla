
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFound from '../../src/pages/NotFound';

describe('NotFound', () => {
  it('affiche le message d’erreur', () => {
    render(<NotFound />);
    expect(screen.getByText(/page non trouvée/i)).toBeInTheDocument();
  });
});
