import { React, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import DisksContainer from './DisksContainer';
import '../index.css';

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
`;

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
      <ThemeProvider theme={props.theme}>
        <DisksContainer 
          disksText={props.disksText} 
          selectedDisk={selectedDisk} 
          setSelectedDisk={setSelectedDisk} 
        />
        <RotateButton 
          className="rotateClockwise"
          aria-label="Rotate selected disk clockwise"
          visibility={selectedDisk > -1 ? 'visible' : 'hidden'} 
          onClick={() => rotateDisk(1)}
        >
          &#8635;
        </RotateButton>
        <RotateButton 
          className="rotateCounterClockwise"
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