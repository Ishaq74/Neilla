import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Index from '../src/pages/Index';
import NotFound from '../src/pages/NotFound';

// Test de la page d'accueil

describe('Index page', () => {
  it('affiche le titre de la page', () => {
    const { getByText } = render(<Index />);
    expect(getByText(/maquillage professionnel/i)).toBeDefined();
  });
});

// Test de la page NotFound

describe('NotFound page', () => {
  it('affiche le message d’erreur', () => {
    const { getByText } = render(<NotFound />);
    expect(getByText(/page non trouvée/i)).toBeDefined();
  });
});

// Ajoutez d'autres tests pour les pages principales
