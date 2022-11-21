import { React, useState } from 'react';
import DisksContainer from './DisksContainer';
import '../index.css';

const ReactDisks = (props) => {
  const [selectedDisk, setSelectedDisk] = useState(-1);
  const [rotatedDisksText, setRotatedDisksText] = useState(JSON.parse(JSON.stringify(props.disksText || [])));
  
  const rotateDisk = (direction) => {
    const element = document.getElementsByClassName('ColumnsContainer')[selectedDisk];
    const currentTransform = element.style.transform;
    const currentAngle = currentTransform === '' ? 0 : currentTransform.match(/rotate\((.*?)deg\)/)[1];
    const angleToAdd = direction * 360 / props.disksText[selectedDisk].length;

    const styles = {
      "transition": "transform 0.5s linear",
      "transform": `rotate(${Number(currentAngle) + Number(angleToAdd)}deg)`
    };
    Object.assign(element.style, styles);
    setTimeout(() => element.style.transition = "none", 500);
    
    const clone = JSON.parse(JSON.stringify(rotatedDisksText));
    if (direction === 1) {
      clone[selectedDisk].push(clone[selectedDisk].shift());
      setRotatedDisksText(clone);
    } else {
      clone[selectedDisk].unshift(clone[selectedDisk].pop());
      setRotatedDisksText(clone);
    }
    
    if (props.onRotate) {
      props.onRotate(clone);
    }
  }
  
  return (
    <div className="ReactDisks">
      <DisksContainer 
        disksText={props.disksText} 
        selectedDisk={selectedDisk} 
        setSelectedDisk={setSelectedDisk} 
      />
      <button 
        className="controls rotateClockwise"
        aria-label="Rotate selected disk clockwise"
        style={{"visibility": `${selectedDisk > -1 ? 'visible' : 'hidden'}`}} 
        onClick={() => rotateDisk(1)}
      >
        &#8635;
      </button>
      <button 
        className="controls rotateCounterClockwise"
        aria-label="Rotate selected disk counterclockwise"
        style={{"visibility": `${selectedDisk > -1 ? 'visible' : 'hidden'}`}} 
        onClick={() => rotateDisk(-1)}
      >
        &#8634;
      </button>
    </div>
  );
};

export default ReactDisks;