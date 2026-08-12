import React from 'react';
import { Hero } from '../../components/Hero/Hero';

export const Menus = () => {
  return (
    <div style={{ padding: '20vh 10vw', minHeight: '100vh', backgroundColor: 'var(--color-cream)', color: 'var(--color-dark)' }}>
      <h1 className="heading-large text-accent">The Menus</h1>
      <p style={{ marginTop: '2rem', fontSize: '1.2rem' }}>Experience the rich curries and tandoori delicacies.</p>
    </div>
  );
};
