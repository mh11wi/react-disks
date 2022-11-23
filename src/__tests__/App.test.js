import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders at least one disk', () => {
  render(<App />);
  const disk= screen.getByRole('button', { name: /disk 1/i });
  expect(disk).toBeInTheDocument();
});
