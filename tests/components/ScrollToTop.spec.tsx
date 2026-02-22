import { render } from '@testing-library/react';
import React from 'react';
import { describe, it } from 'vitest';
import ScrollToTop from '../../src/components/ScrollToTop';

describe('ScrollToTop', () => {
  it('rendu sans crash', () => {
    render(<ScrollToTop />);
  });
});
