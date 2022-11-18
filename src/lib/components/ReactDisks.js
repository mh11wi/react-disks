import { React, useState } from 'react';
import DisksContainer from './DisksContainer';
import '../index.css';

const ReactDisks = (props) => {
  const [selectedDisk, setSelectedDisk] = useState(-1);
  const [rotatedDisksText, setRotatedDisksText] = useState(JSON.parse(JSON.stringify(props.disksText || [])));
  
  const rotateDisk = (direction) => {
    const degrees = direction * 360 / props.disksText[selectedDisk].length;
    const el = document.getElementsByClassName('ColumnsContainer')[selectedDisk];
    
    // TO-DO: fix this animation
    // Subsequent clicks are not animating at all in ios
    // First clicks jump to wrong column on chrome/firefox, yet subsequent ones are fine strangely
    const animation = el.animate(
      {"transform": `rotate(${degrees}deg)`},
      {"duration": 1000, "fill": "forwards", "composite": "accumulate"}
    );

    animation.onfinish = () => {
      animation.commitStyles();
    }
    
    const clone = JSON.parse(JSON.stringify(rotatedDisksText));
    if (direction === 1) {
      clone[selectedDisk].push(clone[selectedDisk].shift());
      setRotatedDisksText(clone);
    } else {
      clone[selectedDisk].unshift(clone[selectedDisk].pop());
      setRotatedDisksText(clone);
    }
  }
  
  return (
    <div className="ReactDisks">
      <button 
        className="controls rotateClockwise" 
        style={{"visibility": `${selectedDisk > -1 ? 'visible' : 'hidden'}`}} 
        onClick={() => rotateDisk(1)}
      >
        &#8635;
      </button>
      <DisksContainer 
        disksText={props.disksText} 
        selectedDisk={selectedDisk} 
        setSelectedDisk={setSelectedDisk} 
      />
      <button 
        className="controls rotateCounterClockwise" 
        style={{"visibility": `${selectedDisk > -1 ? 'visible' : 'hidden'}`}} 
        onClick={() => rotateDisk(-1)}
      >
        &#8634;
      </button>
    </div>
  );
};

export default ReactDisks;