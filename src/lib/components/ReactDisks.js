import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import DisksContainer from './DisksContainer';
import '../index.css';

const ANNOUNCEMENT = {
  NONE: "No disks selected",
}

const RotateButton = styled.button`
  color: ${props => props.theme.dark};
  background-color: transparent;
  border: 0;
  padding: 0 0.5rem;
  font-size: 2.5rem;
  font-weight: bold;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  visibility: ${props => props.visibility};
  
    &:hover, &:focus {
      color: ${props => props.theme.main};
    }
    
    &:focus-visible {
      outline-color: transparent;
      outline-style: solid;
      border:  ${props => `3px solid ${props.theme.dark}`};
    }
`;

const ReactDisks = (props) => {
  const [selectedDisk, setSelectedDisk] = useState(-1);
  const [rotatedDisksText, setRotatedDisksText] = useState(JSON.parse(JSON.stringify(props.disksText || [])));
  const [announcement, setAnnouncement] = useState(ANNOUNCEMENT.NONE);
  
  useEffect(() => {
    setSelectedDisk(-1);
    setRotatedDisksText(JSON.parse(JSON.stringify(props.disksText || [])));
    document.querySelectorAll('.ColumnsContainer').forEach(el => el.style.transform = '');
  }, [props.disksText]);
  
  useEffect(() => {
    setSelectedDisk(-1);
  }, [props.disabled]);
  
  useEffect(() => {
    setAnnouncement(selectedDisk === -1 ? ANNOUNCEMENT.NONE : `Disk ${selectedDisk + 1} selected`);
  }, [selectedDisk]);
  
  const rotateDisk = (direction) => {
    const element = document.getElementsByClassName('ColumnsContainer')[selectedDisk];
    const currentTransform = element.style.transform;
    const currentAngle = currentTransform === '' ? 0 : currentTransform.match(/rotate\((.*?)deg\)/)[1];
    const angleToAdd = direction * 360 / props.disksText[selectedDisk].length;

    const styles = {
      transition: "transform 0.5s linear",
      transform: `rotate(${Number(currentAngle) + Number(angleToAdd)}deg)`
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
    
    setAnnouncement(`Disk ${selectedDisk + 1} rotated: ${clone[selectedDisk].join(' ')}`);
    setTimeout(() => setAnnouncement(`Disk ${selectedDisk + 1} still selected`), 2000);
    
    if (props.onRotate) {
      props.onRotate(clone);
    }
  }
  
  return (
    <div className="ReactDisks">
      <ThemeProvider theme={props.theme}>
        <DisksContainer 
          disksText={props.disksText}
          rotatedDisksText={rotatedDisksText}
          selectedDisk={selectedDisk} 
          setSelectedDisk={setSelectedDisk}
          disabled={props.disabled}
        />
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {announcement}
        </div>
        <RotateButton
          className="rotateClockwise"
          data-testid="rotate-clockwise"
          aria-label="Rotate selected disk clockwise"
          visibility={selectedDisk > -1 ? 'visible' : 'hidden'} 
          onClick={() => rotateDisk(1)}
        >
          &#8635;
        </RotateButton>
        <RotateButton
          className="rotateCounterClockwise"
          data-testid="rotate-counterclockwise"
          aria-label="Rotate selected disk counterclockwise"
          visibility={selectedDisk > -1 ? 'visible' : 'hidden'}
          onClick={() => rotateDisk(-1)}
        >
          &#8634;
        </RotateButton>
      </ThemeProvider>
    </div>
  );
};

ReactDisks.defaultProps = {
  theme: {
    main: "cyan",
    light: "lightcyan",
    dark: "darkcyan",
  }
}

export default ReactDisks;