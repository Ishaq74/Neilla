import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Services from '../../../src/components/Services';

describe('Services', () => {
  it('rendu sans crash', () => {
    const { container } = render(<Services />);
    expect(container).toBeInTheDocument();
  });
});
