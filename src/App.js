import React from "react";
import ReactDOM from "react-dom";
import coins from './assets/images/goldcoins.png';
import dice from './assets/images/dice.png';
import './App.css';

class App extends React.Component {
  state = {
    
    list: ["Rs 100","Rs 500","Rs 9,999","Rs 1","Rs 60"],
    radius: 75, 
    rotate: 0, 
    easeOut: 0, 
    angle: 0, 
    top: null, 
    offset: null, 
    net: null, 
    result: null,
    spinning: false
  };

  componentDidMount() {
    this.renderWheel();
  }

  renderWheel() {
    let numOptions = this.state.list.length;
    let arcSize = (2 * Math.PI) / numOptions;
    this.setState({
      angle: arcSize
    });

    this.topPosition(numOptions, arcSize);

  
    let angle = 0;
    for (let i = 0; i < numOptions; i++) {
      let text = this.state.list[i];
      this.renderSector(i + 1, text, angle, arcSize, this.getColor());
      angle += arcSize;
    }
  }

  topPosition = (num, angle) => {
    let topSpot = null;
    let degreesOff = null;
    if (num === 9) {
      topSpot = 7;
      degreesOff = Math.PI / 2 - angle * 2;
    } else if (num === 8) {
      topSpot = 6;
      degreesOff = 0;
    } else if (num <= 7 && num > 4) {
      topSpot = num - 1;
      degreesOff = Math.PI / 2 - angle;
    } else if (num === 4) {
      topSpot = num - 1;
      degreesOff = 0;
    } else if (num <= 3) {
      topSpot = num;
      degreesOff = Math.PI / 2;
    }

    this.setState({
      top: topSpot - 1,
      offset: degreesOff
    });
  };

  renderSector(index, text, start, arc, color) {
    let canvas = document.getElementById("wheel");
    let ctx = canvas.getContext("2d");
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let radius = this.state.radius;
    let startAngle = start;
    let endAngle = start + arc;
    let angle = index * arc;
    let baseSize = radius * 3.33;
    let textRadius = baseSize - 150;

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, false);
    ctx.lineWidth = radius * 2;
    ctx.strokeStyle = color;

    ctx.font = "17px Arial";
    ctx.fillStyle = "black";
    ctx.stroke();

    ctx.save();
    ctx.translate(
      baseSize + Math.cos(angle - arc / 2) * textRadius,
      baseSize + Math.sin(angle - arc / 2) * textRadius
    );
    ctx.rotate(angle - arc / 2 + Math.PI / 2);
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    ctx.restore();
  }

  getColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b},0.4)`;
  }

  spin = () => {
    let randomSpin = Math.floor(Math.random() * 900) + 500;
    this.setState({
      rotate: randomSpin,
      easeOut: 2,
      spinning: true
    });
    setTimeout(() => {
      this.getResult(randomSpin);
      console.log("degree on rotation", this.state.net*(180/Math.PI))
    }, 2000);
  };

  getResult = spin => {
    const { angle, top, offset, list } = this.state;
    let netRotation = ((spin % 360) * Math.PI) / 180;
    let travel = netRotation + offset;
    let count = top + 1;
    while (travel > 0) {
      travel = travel - angle;
      count--;
    }
    let result;
    if (count >= 0) {
      result = count;
    } else {
      result = list.length + count;
    }
    this.setState({
      net: netRotation,
      result: result
    });
  };

  reset = () => {
    this.setState({
      rotate: 0,
      easeOut: 0,
      result: null,
      spinning: false
    });
  };

  render() {
    return (
      <div className="App">

        <img src={coins} className="coin-header" alt="logo" />
        <p className='text-header'>You have</p>
        <p className='coin-class'>80 Coins</p>
        
        <img src={dice} className="dice-header" alt="logo" />
        <p className='dice-text-header'>10 Chances Left</p>
        <h1>Wheel Spin React</h1>
        <span id="selector"><div style={{width:'50px',height:'50px',marginTop:'-15px',backgroundColor:'white', borderRadius:'50%'}}>&#9650;</div></span>
        
        <canvas
          id="wheel"
          width="500"
          height="500"
          style={{
            WebkitTransform: `rotate(${this.state.rotate}deg)`,
            WebkitTransition: `-webkit-transform ${
              this.state.easeOut
            }s ease-out`
          }}
        />

        {this.state.spinning ? (
          <button type="button" id="reset" onClick={this.reset}>
            reset
          </button>
        ) : (
          <button type="button" id="spin" onClick={this.spin}>
            spin
          </button>
        )}
        <div class="display">
          <span id="readout">
            YOU WON:{"  "}
            <span id="result">{this.state.list[this.state.result]}</span>
          </span>
        </div>
      </div>
    );
  }
}

export default App;