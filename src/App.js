import { React, useState } from 'react';
import ReactDisks from './lib';
import './App.css';

function App() {
  const [disksText] = useState([
    ['a', 'b', 'c', 'd'], 
    ['e', 'f', 'g', 'h'], 
    ['i', 'j', 'k', 'l'], 
    ['m', 'n', 'o', 'p'], 
    ['q', 'r', 's', 't'], 
    ['u', 'v', 'w', 'x'], 
    ['y', 'z', '1', '2']
  ]);
  return (
    <div className="App">
      <h1 className="sr-only">react-disks</h1>
      <ReactDisks 
        disksText={disksText} 
      />
    </div>
  );
}

export default App;
