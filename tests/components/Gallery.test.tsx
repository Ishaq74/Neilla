import { render, screen } from '@testing-library/react';
import Gallery from '../../src/components/Gallery';

describe('Gallery', () => {
  it('affiche le titre et au moins une image', () => {
    render(<Gallery />);
    expect(screen.getByText(/galerie/i)).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
  });
});
