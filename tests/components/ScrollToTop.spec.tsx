import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import ScrollToTop from '../../src/components/ScrollToTop';

describe('ScrollToTop', () => {
  it('rendu sans crash', () => {
    render(<ScrollToTop />);
  });
});
