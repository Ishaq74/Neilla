import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from '../../src/components/Hero';

describe('Hero', () => {
  it('affiche le titre principal', () => {
    render(<Hero />);
    expect(screen.getByText(/maquillage professionnel/i)).toBeInTheDocument();
  });
});
