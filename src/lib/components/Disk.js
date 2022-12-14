import React from 'react';
import ReactCurvedText from 'react-curved-text';
import styled from 'styled-components';

const DiskButton = styled.button`
  color: black;
  background-color: white;
  border: 1px solid #666;
  box-shadow: 0 0 1.5rem #ccc;
  border-radius: 50%;
  padding: 0;
  -webkit-tap-highlight-color: transparent;

    &.active {
      background-color: ${props => props.theme.light};
    }
    
    &:disabled {
      background-color: #f2f2f2;
    }
    
    &:focus-visible {
      outline-color: transparent;
      outline-style: solid;
      border:  ${props => `3px solid ${props.theme.dark}`};
    }
`;
 
const Disk = (props) => {
  const text = Array.isArray(props.text) ? props.text : [' '];
  const columns = text.map((columnText, index) => {
    const svgProps = {
      style: {
        transform: `rotate(-${index * 360 / text.length}deg)`
      },
      "data-testid": `column-${index}`,
      "aria-hidden": true
    };
    const textProps = {
      style: {
        fontSize: `${props.fontSize}px`, 
        fontFamily: "OpenDyslexicRegular"
      }
    };
    return (
      <ReactCurvedText
        key={index}
        width={2 * props.radius}
        height={2 * props.radius}
        cx={props.radius}
        cy={props.radius}
        rx={props.radius - 0.5 * props.fontSize}
        ry={props.radius - 0.5 * props.fontSize}
        text={columnText}
        textProps={textProps}
        svgProps={svgProps}
      />
    );
  });
  
  return (
    <DiskButton
      className={props.className}
      aria-label={props.ariaLabel}
      style={props.style} 
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <div className="ColumnsContainer">
        {columns}
      </div>
    </DiskButton>
  );
};

export default Disk;