import { render } from '@testing-library/react';
import React from 'react';
import ProtectedRoute from '../../../src/components/auth/ProtectedRoute';

describe('ProtectedRoute', () => {
  it('rendu sans crash', () => {
    render(<ProtectedRoute />);
  });
});
