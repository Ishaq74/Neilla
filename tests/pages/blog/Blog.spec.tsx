import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import BlogPage from '../../../src/pages/blog/BlogPage';

describe('BlogPage', () => {
  it('rendu sans crash', () => {
    const { container } = render(<BlogPage />);
    expect(container).toBeInTheDocument();
  });
});
