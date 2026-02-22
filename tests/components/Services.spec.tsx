import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import Services from '../../src/components/Services';

describe('Services', () => {
  it('rendu sans crash', () => {
    render(<Services />);
  });
});
