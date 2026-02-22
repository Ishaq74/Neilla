import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminTheme from '../../../src/pages/admin/AdminTheme';

describe('AdminTheme', () => {
  it('doit rendre la page sans crash', () => {
    const { container } = render(<AdminTheme />);
    expect(container).toBeInTheDocument();
  });
});
