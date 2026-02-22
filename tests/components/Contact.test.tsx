
import React from 'react';
import { vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '@/components/Contact';

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: vi.fn() })
}));

describe('Contact', () => {
  it('affiche le titre et le sous-titre', () => {
    render(<Contact />);
    expect(screen.getByText(/Réservez Votre/i)).toBeInTheDocument();
    expect(screen.getByText(/consultation/i)).toBeInTheDocument();
  });

  it('affiche les champs du formulaire', () => {
    render(<Contact />);
    expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('soumet le formulaire et affiche le message de succès', async () => {
    render(<Contact />);
    fireEvent.change(screen.getByLabelText(/nom/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@mail.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Ceci est un message.' } });
    fireEvent.submit(screen.getByRole('form'));
    await waitFor(() => {
      expect(screen.getByText(/demande envoyée/i)).toBeInTheDocument();
    });
  });
});
