
import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProfilePage from '../../src/pages/ProfilePage';

describe('ProfilePage', () => {
  it('rendu sans crash', () => {
    render(<ProfilePage />);
  });
});
