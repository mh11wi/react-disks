import React from 'react';
import ReactCurvedText from 'react-curved-text';
 
const Disk = (props) => {
  const text = Array.isArray(props.text) ? props.text : [' '];
  const columns = text.map((columnText, index) => {
    const svgProps = {
      "style": {
        "transform": `rotate(-${index * 360 / props.text.length}deg)`
      }
    };
    const textProps = {
      "style": {
        "fontSize": "1rem", 
        "fontFamily": `${props.useDyslexicFont ? 'OpenDyslexicRegular' : 'inherit'}`
      }
    };
    return (
      <ReactCurvedText
        key={index}
        width={2 * props.radius}
        height={2 * props.radius}
        cx={props.radius}
        cy={props.radius}
        rx={props.radius - 8}
        ry={props.radius - 8}
        text={columnText}
        textProps={textProps}
        svgProps={svgProps}
      />
    );
  });
  
  return (
    <button className={props.className} style={props.style} onClick={props.onClick}>
      <div className="ColumnsContainer">
        {columns}
      </div>
    </button>
  );
};

export default Disk;