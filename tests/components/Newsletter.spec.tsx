
import React from 'react';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import Newsletter from '../../src/components/Newsletter';

describe('Newsletter', () => {
  it('rendu sans crash', () => {
    render(<Newsletter />);
  });
});
