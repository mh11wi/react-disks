import React from 'react';
import Disk from './Disk';

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
      if (props.selectedDisk === index) {
        props.setSelectedDisk(-1);
      } else {
        props.setSelectedDisk(index);
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
    } else if (props.selectedDisk === trueIndex) {
      props.setSelectedDisk(-1);
    } else {
      props.setSelectedDisk(trueIndex);
    }
    document.getElementsByClassName('Disk')[trueIndex].focus();
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
        className={index === props.selectedDisk ? "Disk active" : "Disk"}
      />
    );
  });

  return (
    <div className="DisksContainer">
      {disks}
    </div>
  );
};

export default DisksContainer;