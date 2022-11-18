import { React, useState } from 'react';
import Disk from './Disk';
import '../index.css';

function getElementCenter(element) {
  const box = element.getBoundingClientRect();
  const x = (box.left + box.right) / 2;
  const y = (box.top + box.bottom) / 2;
  return { x, y };
}

function isPointInCircle(x, y, cx, cy, radius) {
  const distanceSquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
  return distanceSquared <= radius * radius;
}

const DisksContainer = (props) => {
  const [selectedDisk, setSelectedDisk] = useState(-1);
  const [rotatedDisksText, setRotatedDisksText] = useState(JSON.parse(JSON.stringify(props.disksText)));
  
  const getRadius = (index) => {
    const k = Math.max(40, 15 * (8 - props.disksText.length));
    return k * (index + 1);
  }

  const getTrueIndex = (event, index) => {
    const targetCenter = getElementCenter(event.target);
    for (let i = index; i < props.disksText.length; i++) {
      const radius = getRadius(i);
      const inDisk = isPointInCircle(
        event.clientX,
        event.clientY,
        targetCenter.x,
        targetCenter.y,
        radius
      );
      
      if (inDisk) {
        return i;
      }
    }
    
    return -1;
  }
  
  const handleClick = (event, index) => {
    // Handle if event triggered by tab + enter.
    if (!event.detail) {
      if (selectedDisk === index) {
        setSelectedDisk(-1);
      } else {
        setSelectedDisk(index);
      }
      return;
    }
    
    /*
     * Handle if event triggered by mouse/touch.
     * Because a Disk's bounding rectangle overlaps the next, need to
     * calculate (by radius) what actual Disk was clicked, if any.
     */
    const trueIndex = getTrueIndex(event, index);
    if (trueIndex === -1) {
      document.activeElement.blur();
      return;
    } else if (selectedDisk === trueIndex) {
      setSelectedDisk(-1);
    } else {
      setSelectedDisk(trueIndex);
    }
    document.getElementsByClassName('Disk')[trueIndex].focus();
  }
  
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
  
  if (!Array.isArray(props.disksText)) {
    return null;
  }
  
  const disks = props.disksText.map((text, index) => {
    return (
      <Disk 
        key={index} 
        text={text} 
        radius={getRadius(index)}
        style={{"zIndex": `${props.disksText.length - index}`}}
        onClick={(event) => handleClick(event, index)}
        className={index === selectedDisk ? "Disk active" : "Disk"}
        useDyslexicFont={props.useDyslexicFont}
      />
    );
  });

  // TO-DO: consider extracting buttons in a top level component
  return (
    <div className="DisksContainer">
      <button 
        className="controls rotateClockwise" 
        style={{"visibility": `${selectedDisk > -1 ? 'visible' : 'hidden'}`}} 
        onClick={() => rotateDisk(1)}
      >
        &#8635;
      </button>
      {disks}
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

export default DisksContainer;