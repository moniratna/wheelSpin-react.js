import wheel from './assets/images/roundObject.png';
import coins from './assets/images/goldcoins.png';
import dice from './assets/images/dice.png';
import './App.css';
import {useState, useEffect} from 'react';

function App() {
  const [elementStatus, setElementStatus] = useState(null);
 

  useEffect(() => {
    var element = document.getElementById("appId");
    setElementStatus(element)
    const st = getComputedStyle(document.documentElement).getPropertyValue('--status');
  },[])


  const getDegrees = (num) => {
    const angle = Math.round(Math.acos(num) * (180/Math.PI));
    return angle;

  }

  const handlePause = () => {
    document.documentElement.style.setProperty('--status', 'start');

    setTimeout(() => {
      document.documentElement.style.setProperty('--status', 'paused');

      var getMatrix = getComputedStyle(elementStatus, null);
      // console.log("printing getMatrix", getMatrix)
      var matrix = new DOMMatrix(getMatrix.transform);
    
      const degree = getDegrees(matrix.b);
      // console.log(matrix)

      console.log("Angle of the rotation: "+degree+" deg");

    },1+Math.random()*10*1000)
    
  }
  return (
    <div className="App">
      <header className="App-header">

        <img src={coins} className="coin-header" alt="logo" />
        <p className='text-header'>You have</p>
        <p className='coin-class'>80 Coins</p>
        
        <img src={dice} className="dice-header" alt="logo" />
        <p className='dice-text-header'>10 Chances Left</p>
        
        
        <div id='appId'>
          <img src={wheel} style={{height:'350px', width:'340px'}} alt="logo" />
        </div>
        
          <button className='button' style={{marginBottom:"20px"}} onClick={handlePause}>Spin</button>

          <button className='button-two' onClick={()=>window.location.reload()}>Leave Game</button>
      </header>
    </div>
  );
}

export default App;
