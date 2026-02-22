
import React from 'react';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import ThemeToggle from '../../src/components/ThemeToggle';

describe('ThemeToggle', () => {
  it('rendu sans crash', () => {
    render(<ThemeToggle />);
  });
});
