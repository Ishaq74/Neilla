
import React from 'react';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import FloatingCTA from '../../src/components/FloatingCTA';

describe('FloatingCTA', () => {
  it('rendu sans crash', () => {
    render(<FloatingCTA />);
  });
});
