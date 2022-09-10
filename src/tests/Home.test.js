// React
import React from 'react';

// Testing
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

// Custom
import App from '../components/App';
import { withProvider } from './setupTests';

test('Loads home screen and validates its content', async () => {
  render(withProvider(<App />));

  // App should launch on home screen
  expect(screen.getByRole('heading')).toHaveTextContent('Welcome to the Body Age Calculator!');
});