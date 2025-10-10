import { render, screen } from '@testing-library/react';
import App from './App';

test('renders AI Bias Detective intro screen', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /AI Bias Detective/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /How to Play/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Start Detective Mission/i })).toBeInTheDocument();
});
