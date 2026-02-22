
import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import { AuthProvider, AuthContext } from '../../src/contexts/AuthContext';

describe('AuthProvider', () => {
  it('fournit le contexte', () => {
    let value;
    function TestComponent() {
      value = useContext(AuthContext);
      return <div>test</div>;
    }
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(value).toBeDefined();
  });
});
