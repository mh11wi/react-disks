import { render, screen, fireEvent } from '@testing-library/react';
import ReactDisks from '../lib';

const disksText = [['a', 'b', 'c', 'd']];

test('rotate buttons are not visible when a disk is not selected', () => {
  render(<ReactDisks disksText={disksText} />);
  
  const rotateClockwise= screen.getByTestId('rotate-clockwise');
  expect(rotateClockwise).not.toBeVisible();
  
  const rotateCounterClockwise= screen.getByTestId('rotate-counterclockwise');
  expect(rotateCounterClockwise).not.toBeVisible();
});

test('selected disk can be rotated clockwise', () => {
  const onRotate = jest.fn();
  render(<ReactDisks disksText={disksText} onRotate={onRotate} />);
  
  const disk = screen.getByRole('button', { name: /disk 1/i });
  fireEvent.click(disk);
  
  const rotateClockwise= screen.getByTestId('rotate-clockwise');
  expect(rotateClockwise).toBeVisible();
  
  fireEvent.click(rotateClockwise);
  expect(disk.querySelector('.ColumnsContainer').style.transform).toBe('rotate(90deg)');
  
  fireEvent.click(rotateClockwise);
  expect(disk.querySelector('.ColumnsContainer').style.transform).toBe('rotate(180deg)');
  
  expect(onRotate).toHaveBeenCalledTimes(2);
});

test('selected disk can be rotated counterclockwise', () => {
  const onRotate = jest.fn();
  render(<ReactDisks disksText={disksText} onRotate={onRotate} />);
  
  const disk = screen.getByRole('button', { name: /disk 1/i });
  fireEvent.click(disk);
  
  const rotateCounterClockwise= screen.getByTestId('rotate-counterclockwise');
  expect(rotateCounterClockwise).toBeVisible();
  
  fireEvent.click(rotateCounterClockwise);
  expect(disk.querySelector('.ColumnsContainer').style.transform).toBe('rotate(-90deg)');
  
  fireEvent.click(rotateCounterClockwise);
  expect(disk.querySelector('.ColumnsContainer').style.transform).toBe('rotate(-180deg)');
  
  expect(onRotate).toHaveBeenCalledTimes(2);
});

test('a theme can be set', () => {
  const theme = {
    main: "magenta",
    light: "plum",
    dark: "darkmargenta"
  };
  render(<ReactDisks disksText={disksText} theme={theme} />);
  
  const disk = screen.getByRole('button', { name: /disk 1/i });
  fireEvent.click(disk);
  expect(disk).toHaveStyle("background-color: plum");
});