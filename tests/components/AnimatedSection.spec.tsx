
import React from 'react';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import AnimatedSection from '../../src/components/AnimatedSection';

describe('AnimatedSection', () => {
  it('rendu sans crash', () => {
    render(<AnimatedSection>{null}</AnimatedSection>);
  });
});
