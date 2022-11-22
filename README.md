# react-disks

A shared react component for a stack of rotatable disks containing text.

## Installation

Clone this repository and in its directory, run:

- `npm install` to install the app and its dependencies.

- `npm start` to run the app in the development mode. Open [localhost:3000](http://localhost:3000) to view it in your browser. 

## Usage

```js
import { ReactDisks } from './lib';

function App() {
  return (
    <ReactDisks
      disksText={[['a', 'b', 'c'], ['d', 'e', 'f']]}
      onRotate={(rotatedDisksText) => console.log(rotatedDisksText)}
      theme={{main: "magenta", light: "plum", dark: "darkmagenta"}}
    />
  );
}

export default App;
```


## API

| **Prop**          	| **Type** 	| **Required** 	| **Description**                                                  |
|-------------------	|----------	|--------------	|----------------------------------------------------------------- |
| **disksText**       | array   	| yes          	| Text to be displayed in each disk                                |
| **onRotate**        | function  | no          	| Function called after a disk is rotated                          |
| **theme**        	  | object   	| no          	| Component colouring (options: **main**, **light**, and **dark**) |
