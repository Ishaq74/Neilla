
import React from 'react';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import Process from '../../src/components/Process';

describe('Process', () => {
  it('rendu sans crash', () => {
    render(<Process />);
  });
});
