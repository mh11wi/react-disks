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
    const width = props.width || 100;
    const height = props.height || 100;
    
    let maxRadius = Math.min(width, height);
    if (Math.min(width, height) / Math.max(width, height) <= 0.75) {
      maxRadius *= 0.475;
    } else {
      maxRadius *= 0.375;
    }
    
    const minRadius = 0.6 * maxRadius / props.disksText.length;
    return (maxRadius - minRadius) * (index + 1) / props.disksText.length + minRadius;
  }
  
  const getFontSize = () => {    
    const fs = props.disksText.length === 1 ? getRadius(0) / 2 : getRadius(1) - getRadius(0);
    return Math.min(fs / 2, 26);
  }

  const getTrueIndex = (event, index) => {
    const html = document.querySelectorAll('html')[0];
    const matrix = window.getComputedStyle(html).transform;
    const matrixArray = matrix.replace("matrix(", "").split(",");
    let scale = parseFloat(matrixArray[0]);
    scale = isNaN(scale) ? 1.0 : scale;
    
    const targetCenter = getElementCenter(event.target);
    for (let i = index; i < props.disksText.length; i++) {
      const radius = getRadius(i) * scale;
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
    let ariaLabel = `Disk ${index + 1}`;
    if (Array.isArray(props.rotatedDisksText) && props.rotatedDisksText[index]) {
      ariaLabel += `: ${props.rotatedDisksText[index].join(' ')}`;
    }
    
    return (
      <Disk 
        key={index} 
        text={text} 
        radius={getRadius(index)}
        fontSize={getFontSize()}
        style={{"zIndex": `${props.disksText.length - index}`}}
        onClick={(event) => handleClick(event, index)}
        className={index === props.selectedDisk ? 'Disk active' : 'Disk'}
        ariaLabel={ariaLabel}
        disabled={props.disabled}
      />
    );
  });

  return (
    <div className="DisksContainer" data-testid="disks-container">
      {disks}
    </div>
  );
};

export default DisksContainer;