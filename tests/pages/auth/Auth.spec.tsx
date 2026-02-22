import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import LoginPage from '../../../src/pages/auth/LoginPage';
import RegisterPage from '../../../src/pages/auth/RegisterPage';

describe('LoginPage', () => {
  it('rendu sans crash', () => {
    const { container } = render(<LoginPage />);
    expect(container).toBeInTheDocument();
  });
});

describe('RegisterPage', () => {
  it('rendu sans crash', () => {
    const { container } = render(<RegisterPage />);
    expect(container).toBeInTheDocument();
  });
});
