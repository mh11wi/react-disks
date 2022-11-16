import { Fragment, React } from 'react';
import ReactCurvedText from 'react-curved-text';
 
const Disk = (props) => {
  const text = Array.isArray(props.text) ? props.text : [' '];
  const columns = text.map((columnText, index) => {
    const svgProps = {
      "style": {
        "transform": `rotate(-${index * 360 / props.text.length}deg)`, 
        "border": `${index === 0 ? 1 : 0}px solid #616161`
      }
    };
    return (
      <ReactCurvedText
        key={index}
        width={2 * props.radius}
        height={2 * props.radius}
        cx={props.radius}
        cy={props.radius}
        rx={props.radius}
        ry={props.radius}
        text={columnText}
        textProps={{"style": {"fontSize": "1rem"}}}
        svgProps={svgProps}
      />
    );
  });
  
  return (
    <Fragment>
      {columns}
    </Fragment>
  );
};

export default Disk;