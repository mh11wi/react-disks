import React from 'react';
import Disk from './Disk';
import '../index.css';

const DisksContainer = (props) => {
  if (!Array.isArray(props.disksText)) {
    return null;
  }
  
  const disks = props.disksText.map((text, index) => {
    const k = Math.max(32, 15 * (8 - props.disksText.length));
    return (
      <Disk 
        key={index} 
        text={text} 
        radius={k * (index + 1)}
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