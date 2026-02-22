import { render, screen } from '@testing-library/react';
import Formations from '../../src/components/Formations';

describe('Formations', () => {
  it('affiche le titre et au moins une formation', () => {
    render(<Formations />);
    expect(screen.getByText(/formations/i)).toBeInTheDocument();
    expect(screen.getAllByRole('article').length).toBeGreaterThan(0);
  });
});
