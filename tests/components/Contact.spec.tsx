import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Contact from '../../src/components/Contact';

describe('Contact', () => {
  it('affiche le formulaire de contact', () => {
    render(<Contact />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });
});
