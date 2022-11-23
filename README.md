# react-disks

A shared react component for a stack of rotatable disks containing text.

If an `m`&times;`n` array is passed to the component, `m` disks will render with `n` text items evenly spaced around each disk.

## Installation

Clone this repository and in its directory, run:

- `npm install` to install the app and its dependencies.

- `npm start` to run the app in the development mode. Open [localhost:3000](http://localhost:3000) to view it in your browser. 

## Example

```js
import ReactDisks from './lib';

function App() {
  return (
    <ReactDisks
      disksText={[['a', 'b', 'c', 'd'], ['e', 'f', 'g', 'h'], ['i', 'j', 'k', 'l]]}
      onRotate={(rotatedDisksText) => console.log(rotatedDisksText)}
      theme={{main: "magenta", light: "plum", dark: "darkmagenta"}}
    />
  );
}

export default App;
```


## Props

| **Prop**            | **Type**    | **Required**  | **Description**                                                           |
|-------------------- |------------ |-------------- |-------------------------------------------------------------------------- |
| **disksText**       | 2D array    | yes           | Text to be displayed in each disk                                         |
| **onRotate**        | function    | no            | Function called after a disk is rotated (use to obtain new order of text) |
| **theme**           | object      | no            | Component colouring (options: **main**, **light**, and **dark**)          |
| **disabled**        | boolean     | no            | Whether the disks should be disabled                                      |