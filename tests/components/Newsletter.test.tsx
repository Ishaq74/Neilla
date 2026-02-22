import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Newsletter from '../../src/components/Newsletter';

describe('Newsletter', () => {
  it('affiche le titre et le champ email', () => {
    render(<Newsletter />);
    expect(screen.getByText(/Newsletter Beauté/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/votre email/i)).toBeInTheDocument();
  });

  it('affiche les bénéfices', () => {
    render(<Newsletter />);
    expect(screen.getByText(/Conseils beauté exclusifs/i)).toBeInTheDocument();
    expect(screen.getByText(/Offres privilégiées/i)).toBeInTheDocument();
    expect(screen.getByText(/Tendances en avant-première/i)).toBeInTheDocument();
  });

  it('affiche un message de succès après inscription', async () => {
    render(<Newsletter />);
    fireEvent.change(screen.getByPlaceholderText(/votre email/i), { target: { value: 'test@mail.com' } });
    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));
    await waitFor(() => {
      expect(screen.getByText(/merci pour votre inscription/i)).toBeInTheDocument();
    });
  });

  it('n’affiche pas le message de succès si champ vide', () => {
    render(<Newsletter />);
    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));
    expect(screen.queryByText(/merci pour votre inscription/i)).not.toBeInTheDocument();
  });
});
