import { DisksContainer } from './lib';
import './App.css';

function App() {
  const disksText = ['abcd', 'efgh', 'ijkl', 'mnop', 'qrst', 'uvwx', 'yz12'];

  return (
    <div className="App">
      <DisksContainer disksText={disksText} />
    </div>
  );
}

export default App;
