
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingModal from '../../src/components/BookingModal';

describe('BookingModal', () => {
  it('rend le composant sans crash', () => {
    render(<BookingModal open={true} onClose={() => {}} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('gère la fermeture du modal', () => {
    const handleClose = vi.fn();
    render(<BookingModal open={true} onClose={handleClose} />);
    fireEvent.click(screen.getByLabelText(/fermer/i));
    expect(handleClose).toHaveBeenCalled();
  });
});
