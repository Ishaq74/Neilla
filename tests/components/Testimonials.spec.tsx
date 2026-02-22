
import React from 'react';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import Testimonials from '../../src/components/Testimonials';

describe('Testimonials', () => {
  it('rendu sans crash', () => {
    render(<Testimonials />);
  });
});
