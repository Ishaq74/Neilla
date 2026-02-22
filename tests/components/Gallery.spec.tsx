
import React from 'react';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import Gallery from '../../src/components/Gallery';

describe('Gallery', () => {
  it('rendu sans crash', () => {
    render(<Gallery />);
  });
});
