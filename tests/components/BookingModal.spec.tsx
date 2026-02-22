import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BookingModal from '../../src/components/BookingModal';

describe('BookingModal', () => {
  it('ouvre et ferme le modal', () => {
    const { getByTestId } = render(<BookingModal isOpen={true} onClose={() => {}} />);
    expect(getByTestId('booking-modal')).toBeVisible();
  });
});
