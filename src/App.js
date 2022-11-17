import { DisksContainer } from './lib';
import './App.css';

function App() {
  const disksText = [
    ['a', 'b', 'c', 'd'], 
    ['e', 'f', 'g', 'h'], 
    ['i', 'j', 'k', 'l'], 
    ['m', 'n', 'o', 'p'], 
    ['q', 'r', 's', 't'], 
    ['u', 'v', 'w', 'x'], 
    ['y', 'z', '1', '2']
  ];
  
  /*
  const disksText = [
    [1, 2, 3, 4], 
    [5, 6, 7, 8], 
    [9, 10, 11, 12]
  ];
  */

  return (
    <div className="App">
      <DisksContainer disksText={disksText} useDyslexicFont={true} />
    </div>
  );
}

export default App;
