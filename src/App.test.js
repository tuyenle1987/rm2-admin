import { render, screen } from '@testing-library/react';
import App from './App';

class ResizeObserver {
  observe() {}
  disconnect() {}
  unobserve() {}
}

global.ResizeObserver = ResizeObserver;

test('renders Purchase text', () => {
  render(<App />);
  const elem = screen.getAllByText(/Purchase/i)[0];
  expect(elem).toBeInTheDocument();
});
