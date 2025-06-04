import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main hero heading', () => {
  render(<App />);
  expect(screen.getByText(/Web & Game Developer/i)).toBeInTheDocument();
});
