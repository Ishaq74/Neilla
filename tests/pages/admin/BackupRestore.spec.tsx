import React from 'react';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import BackupRestore from '../../../src/components/admin/BackupRestore';

describe('BackupRestore', () => {
  it('rendu sans crash', () => {
    render(<BackupRestore />);
  });
});
