import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styled, { ThemeProvider } from 'styled-components';
import DisksContainer from './DisksContainer';
import '../index.css';

const ANNOUNCEMENT = {
  NONE: "No disks selected",
  DISABLED: "Disks disabled"
}

const ReactDisksStyled = styled.div`
  ${props => props.width <= props.height &&
    `
      grid-template: 1fr 1fr 1fr / 1fr;

      .DisksContainer {
        grid-row-start: 2;
        grid-column-start: 1;
      }

      .rotateClockwise {
        grid-row-start: 1;
        grid-column-start: 1;
        transform: rotate(135deg);
      }

      .rotateCounterClockwise {
        grid-row-start: 3;
        grid-column-start: 1;
        transform: rotate(45deg);
      }
    `
  }
`;

const RotateButton = styled.button`
  color: ${props => props.theme.dark};
  background-color: transparent;
  border: 0;
  padding: 0 0.7rem;
  font-size: 3rem;
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

function debounce(func) {
  let timer;
  return function(event) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(func, 100, event);
  };
}

const ReactDisks = (props) => {
  const ref = useRef(null);
  const [dimensions, setDimensions] = useState({width: 0, height: 0});
  const [selectedDisk, setSelectedDisk] = useState(-1);
  const [rotatedDisksText, setRotatedDisksText] = useState(JSON.parse(JSON.stringify(props.disksText || [])));
  const [announcement, setAnnouncement] = useState(ANNOUNCEMENT.NONE);
  
  const swipeHandlers = useSwipeable({
    onSwipedLeft: (e) => {
      if (props.swipeMode) {
        const containerRect = document.querySelector('.DisksContainer').getBoundingClientRect();
        if (e.initial[1] < (containerRect.top + containerRect.bottom) / 2) {
          rotateDisk(-1);
        } else {
          rotateDisk(1);
        }
      }
    },
    onSwipedRight: (e) => {
      if (props.swipeMode) {
        const containerRect = document.querySelector('.DisksContainer').getBoundingClientRect();
        if (e.initial[1] < (containerRect.top + containerRect.bottom) / 2) {
          rotateDisk(1);
        } else {
          rotateDisk(-1);
        }
      }
    },
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true
  });
  
  useEffect(() => {
    setDimensions({width: ref.current.clientWidth, height: ref.current.clientHeight});
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({width: ref.current.clientWidth, height: ref.current.clientHeight});
    });
    window.addEventListener('resize', debouncedHandleResize);
    return _ => window.removeEventListener('resize', debouncedHandleResize);
  }, []);
  
  useEffect(() => {
    swipeHandlers.ref(document);
    return _ => swipeHandlers.ref({});
  }, [swipeHandlers]);
  
  useEffect(() => {
    setSelectedDisk(-1);
    setRotatedDisksText(JSON.parse(JSON.stringify(props.disksText || [])));
    document.querySelectorAll('.ColumnsContainer').forEach(el => el.style.transform = '');
  }, [props.disksText]);
  
  useEffect(() => {
    if (props.disabled) {
      setAnnouncement(ANNOUNCEMENT.DISABLED);
      setSelectedDisk(-1);
    } else {
      setAnnouncement(selectedDisk === -1 ? ANNOUNCEMENT.NONE : `Disk ${selectedDisk + 1} selected`);
    }
  }, [props.disabled, selectedDisk]);
  
  const rotateDisk = (direction) => {
    if (selectedDisk < 0) {
      return;
    }
    
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
    
    if (props.onRotate) {
      props.onRotate(clone);
    }
  }
  
  return (
    <ReactDisksStyled 
      className="ReactDisks" 
      ref={ref}
      width={dimensions.width}
      height={dimensions.height}
    >
      <ThemeProvider theme={props.theme}>
        <DisksContainer 
          disksText={props.disksText}
          rotatedDisksText={rotatedDisksText}
          width={dimensions.width}
          height={dimensions.height}
          selectedDisk={selectedDisk} 
          setSelectedDisk={setSelectedDisk}
          disabled={props.disabled}
        />
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {announcement}
        </div>
        <div className="sr-only" {...swipeHandlers}></div>
        {!props.swipeMode && 
          <Fragment>
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
          </Fragment>
        }
      </ThemeProvider>
    </ReactDisksStyled>
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