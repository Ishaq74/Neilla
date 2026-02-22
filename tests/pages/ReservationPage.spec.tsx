
import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ReservationPage from '../../src/pages/ReservationPage';

describe('ReservationPage', () => {
  it('rendu sans crash', () => {
    render(<ReservationPage />);
  });
});
