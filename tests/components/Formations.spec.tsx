
import React from 'react';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import Formations from '../../src/components/Formations';

describe('Formations', () => {
  it('rendu sans crash', () => {
    render(<Formations />);
  });
});
