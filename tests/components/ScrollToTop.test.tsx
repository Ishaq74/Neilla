import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ScrollToTop from '../../src/components/ScrollToTop';

describe('ScrollToTop', () => {
  it('rend sans crash', () => {
    render(<ScrollToTop />);
  });
});
