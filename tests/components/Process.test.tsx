import React from 'react';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Process from '../../src/components/Process';

describe('Process', () => {
  it('affiche le titre et au moins une étape', () => {
    render(<Process />);
    expect(screen.getByText(/notre processus/i)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0);
  });
});
