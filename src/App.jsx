import './style.css';
import { useState, useRef } from 'react';

function App() {
  const [currentArray, setCurrentArray] = useState(['element4','element5', 'element1', 'element2', 'element3']);
  const teste = useRef();
  const [currentAction, setCurrentAction] = useState('');

  const prevState = () => {
    teste.current.classList.remove('teste');
    setCurrentArray([ currentArray[4], currentArray[0], currentArray[1], currentArray[2], currentArray[3]])
  }

  const nextState = () => {
    teste.current.classList.remove('teste');
    setCurrentArray([currentArray[1], currentArray[2], currentArray[3], currentArray[4], currentArray[0]]);
  }

  const prevAnimation = () => {
    teste.current.classList.add('teste');    
    teste.current.style.setProperty('--outra', '-71.5vw');
    setCurrentAction('prev');
  }

  const nextAnimation = () => {
    teste.current.classList.add('teste');
    teste.current.style.setProperty('--outra', '71.5vw');
    setCurrentAction('next');
  }

  const verify = () => {
    return currentAction === 'prev' ? prevState() : nextState();
  }

  return (
    <div className="App">
      <button onClick={ prevAnimation }>prev</button>
      <div onAnimationEnd={ verify }
      ref={ teste } className="teste2">
        { currentArray.map((element, index) => (
        <div
          key={ index }
          id={ index }
          className='slide'
        >
          <p>{ element }</p>
        </div>
      )) }
      </div>
      
      <button style={{
        right: '0',
      }}
      onClick={ nextAnimation }
      >Next</button>
    </div>
  )
}

export default App;
