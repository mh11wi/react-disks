# react-disks

A shared react component for a stack of rotatable disks containing text.

If an `m`&times;`n` array of text items is passed to the component, `m` disks will render with `n` items evenly spaced around each disk.

## Installation

```shell
npm install react-disks
```

Please note that dependencies of this package require React **18.0.0** or later.

## Example

```js
import ReactDisks from 'react-disks';

function App() {
  return (
    <ReactDisks
      disksText={[['a', 'b', 'c', 'd'], ['e', 'f', 'g', 'h'], ['i', 'j', 'k', 'l']]}
      onRotate={(rotatedDisksText) => console.log(rotatedDisksText)}
      theme={{main: "magenta", light: "plum", dark: "darkmagenta"}}
      disabled={false}
      swipeMode={false}
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
| **swipeMode**       | boolean     | no            | Whether the disks are rotated via swipe gestures                          |