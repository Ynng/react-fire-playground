import './App.css';
import Slider from 'react-input-slider';
import React, { Component, useState } from 'react';

function ElementPicker(props) {
  return (
    <div className="elementList">
      {
        props.elements.map((element) => (
          <button className={`elementButton ${props.currentElement.symbol == element.symbol ? "active" : ""}`} onClick={() => props.setElement(element)}>
            <h1>{element.symbol}</h1>
            <h4>{element.solution}</h4>
            <h3>EV: {element.EV}</h3>
            <h4>POW: {element.pow}</h4>
          </button>
        ))}
    </div>
  )
}

function MolarityPicker(props) {
  return (
    <div className="molarityList">
      {
        props.molarities.map((molarity) => (
          <button className={`molarityButton ${props.currentMolarity == molarity ? "active" : ""}`} onClick={() => props.setMolarity(molarity)}>
            <h1>{molarity} M</h1>
          </button>
        ))}
    </div>
  )
}

function App() {
  const elementList = [
    {
      name: "Silver",
      symbol: "Ag",
      EV: 0.8,
      solution: "AgNO₃",
      pow: 2
    },
    {
      name: "Copper",
      symbol: "Cu",
      EV: 0.34,
      solution: "Cu(NO₃)₂",
      pow: 1
    },
    {
      name: "Zinc",
      symbol: "Zn",
      EV: -0.76,
      solution: "Zn(NO₃)₂",
      pow: 1
    },
  ];

  const [leftElement, setLeftElement] = useState(elementList[0]);
  const [rightElement, setRightElement] = useState(elementList[0]);
  const [leftMolarity, setLeftMolarity] = useState(1);
  const [rightMolarity, setRightMolarity] = useState(1);


  const molarityList = [
    2, 1, 0.1, 0.01, 0.001
  ];

  var getEMF = () =>
  {
    var n = 2;
    if(0 < leftElement.EV - rightElement.EV)
    {
      return leftElement.EV - rightElement.EV - 0.0592 / n * Math.log(Math.pow(rightMolarity,rightElement.pow) / Math.pow(leftMolarity,leftElement.pow)) / 2.302585092994046;
    }
    else if(leftElement.EV - rightElement.EV < 0)
    {
      return -1 * Math.abs(leftElement.EV - rightElement.EV) - 0.0592 / n * Math.log(Math.pow(leftMolarity,leftElement.pow) / Math.pow(rightMolarity,rightElement.pow)) / 2.302585092994046;
    }
    else if(leftMolarity < rightMolarity)
    {
      return -1 * leftElement.EV - rightElement.EV - 0.0592 / n * Math.log(Math.pow(rightMolarity,rightElement.pow) / Math.pow(leftMolarity,leftElement.pow)) / 2.302585092994046;
    }
    else if(rightMolarity < leftMolarity)
    {
      return Math.abs(leftElement.EV - rightElement.EV) - 0.0592 / n * Math.log(Math.pow(leftMolarity,leftElement.pow) / Math.pow(rightMolarity,rightElement.pow)) / 2.302585092994046;
    }
    else
    {
      return 0;
    }
  }

  return (
    <div className="App">
      <body>
        <div>
          <ElementPicker currentElement={leftElement} elements={elementList} setElement={setLeftElement} />
          <div className = "molarityPickers">
            <MolarityPicker currentMolarity={leftMolarity} molarities={molarityList} setMolarity={setLeftMolarity} />
            <Slider
              styles={{
                active: {
                  backgroundColor: 'red'
                }
              }}
              axis="y"
              ystep={0.001}
              ymin={Math.log(0.001)}
              ymax={Math.log(2)}
              y={Math.log(leftMolarity)}
              yreverse={true}
              onChange={({ y }) => setLeftMolarity(Math.pow(Math.E,y))}
            />
          </div>
          <h2>{leftMolarity.toFixed(3)} M</h2>
        </div>
        <div className = "middlePart">
          <h1>
            E° = {getEMF().toFixed(2)}
          </h1>
          <h2>
            e⁻ {getEMF() == 0 ? 0 : getEMF() > 0 ? "⬅" : "➡"}
          </h2>
        </div>

        <div>
          <ElementPicker currentElement={rightElement} elements={elementList} setElement={setRightElement} />
          <div className = "molarityPickers">
            <MolarityPicker currentMolarity={rightMolarity} molarities={molarityList} setMolarity={setRightMolarity} />
            <Slider
              styles={{
                active: {
                  backgroundColor: 'black'
                }
              }}
              axis="y"
              ystep={0.001}
              ymin={Math.log(0.001)}
              ymax={Math.log(2)}
              y={Math.log(rightMolarity)}
              yreverse={true}
              onChange={({ y }) => setRightMolarity(Math.pow(Math.E,y))}
            />
          </div>
          <h2>{rightMolarity.toFixed(3)} M</h2>
        </div>
      </body>
      <footer>
        <p>Made by <a href="https://github.com/Ynng">Kevin Huang</a> in 2 hours. Please use in Chrome on desktop at 1080p</p>
        <p>A quick, basic, modern remake of this <a href="https://pages.uoregon.edu/tgreenbo/voltaicCellEMF.html">virtual lab</a> as it was made in Flash, which is old. Adding graphics if I have time.</p>
        <p>Why must online "gizmos" have tiny buttons, blurry text, unresponsive UI and slow animation. Why all the pain of a real lab when they don't even try to simulate the fine details and errors of a real lab.</p>
        
      </footer>
    </div>
  );
}

export default App;
