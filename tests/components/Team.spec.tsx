
import React from 'react';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import Team from '../../src/components/Team';

describe('Team', () => {
  it('rendu sans crash', () => {
    render(<Team />);
  });
});
