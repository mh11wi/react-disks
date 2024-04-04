import React from 'react';
import ReactCurvedText from 'react-curved-text';
import styled, { withTheme } from 'styled-components';

const DiskButton = styled.button`
  background-color: ${props => props.theme.background};
  border: ${props => `1px solid ${props.theme.border}`};
  box-shadow: ${props => `0 0 1.5rem ${props.theme.shadow}`};
  border-radius: 50%;
  padding: 0;
  -webkit-tap-highlight-color: transparent;

    &.active {
      background-color: ${props => props.theme.selected};
    }
    
    &:disabled {
      background-color: ${props => props.theme.disabled};
    }
    
    &:focus-visible {
      outline-color: transparent;
      outline-style: solid;
      border: ${props => `3px solid ${props.theme.outline}`};
    }
`;
 
const Disk = (props) => {
  const text = Array.isArray(props.text) ? props.text : [' '];
  const columns = text.map((columnText, index) => {
    const svgProps = {
      style: {
        transform: `rotate(-${index * 360 / text.length}deg)`,
        fill: `${props.theme.text}`
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

export default withTheme(Disk);