import { render, screen } from '@testing-library/react';
import Disk from '../lib/components/Disk';

test('if text is undefined, Disk will render blank', () => {
  render(<Disk ariaLabel="disk" text={undefined} radius={100} />);
  const disk = screen.getByRole('button', { name: /disk/i });
  expect(disk.querySelectorAll('svg')).toHaveLength(1);
  expect(screen.getByTestId('column-0').textContent).toBe(' ');
});

test('if text is null, Disk will render blank', () => {
  render(<Disk ariaLabel="disk" text={null} radius={100} />);
  const disk = screen.getByRole('button', { name: /disk/i });
  expect(disk.querySelectorAll('svg')).toHaveLength(1);
  expect(screen.getByTestId('column-0').textContent).toBe(' ');
});

test('if text is an array of strings, Disk will render the strings', () => {
  const text = ['a', 'b', 'c'];
  render(<Disk ariaLabel="disk" text={text} radius={100} />);
  const disk = screen.getByRole('button', { name: /disk/i });
  expect(disk.querySelectorAll('svg')).toHaveLength(3);
  
  text.forEach((item, index) => {
    expect(screen.getByTestId(`column-${index}`).textContent).toBe(item);
  });
});

test('if text is an array of numbers, Disk will render them as strings', () => {
  const text = [1, 2, 3];
  render(<Disk ariaLabel="disk" text={text} radius={100} />);
  const disk = screen.getByRole('button', { name: /disk/i });
  expect(disk.querySelectorAll('svg')).toHaveLength(3);
  
  text.forEach((item, index) => {
    expect(screen.getByTestId(`column-${index}`).textContent).toBe(item.toString());
  });
});