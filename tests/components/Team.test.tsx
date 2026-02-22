import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Team from '../../src/components/Team';

describe('Team', () => {
  it('affiche le titre', () => {
    render(<Team />);
    expect(screen.getByText(/notre équipe/i)).toBeInTheDocument();
  });
});
