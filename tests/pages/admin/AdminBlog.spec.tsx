import React from 'react';
import { render } from '@testing-library/react';
import AdminBlog from '../../../src/pages/admin/AdminBlog';

describe('AdminBlog', () => {
  it('doit rendre la page sans crash', () => {
    const { container } = render(<AdminBlog />);
    expect(container).toBeInTheDocument();
  });
});
