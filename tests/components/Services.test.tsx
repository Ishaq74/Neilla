import { render, screen } from '@testing-library/react';
import Services from '../../src/components/Services';

describe('Services', () => {
  it('affiche le titre et au moins un service', () => {
    render(<Services />);
    expect(screen.getByText(/services/i)).toBeInTheDocument();
    expect(screen.getAllByRole('article').length).toBeGreaterThan(0);
  });
});
