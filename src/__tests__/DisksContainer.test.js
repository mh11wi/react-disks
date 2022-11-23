import { render, screen } from '@testing-library/react';
import DisksContainer from '../lib/components/DisksContainer';

test('if disksText is undefined, DisksContainer does not render', () => {
  render(<DisksContainer disksText={undefined} />);
  const disksContainer = screen.queryByTestId('disks-container');
  expect(disksContainer).toBeNull();
});

test('if disksText is null, DisksContainer does not render', () => {
  render(<DisksContainer disksText={null} />);
  const disksContainer = screen.queryByTestId('disks-container');
  expect(disksContainer).toBeNull();
});

test('if disksText is a 2D array, DisksContainer will render', () => {
  render(<DisksContainer disksText={[['a', 'b', 'c', 'd'], ['e', 'f', 'g', 'h'], ['i', 'j', 'k', 'l']]} />);
  const disksContainer = screen.queryByTestId('disks-container');
  expect(disksContainer).not.toBeNull();
  
  const disks = screen.getAllByRole('button', { name: /disk/i });
  expect(disks).toHaveLength(3);
  expect(disks[0].querySelectorAll('svg')).toHaveLength(4);
});