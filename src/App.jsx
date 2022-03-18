import './style.css';
import { useState, useRef, useEffect } from 'react';

function App() {
  const [currentArray, setCurrentArray] = useState(['element4','element5', 'element5', 'element2', 'element10']);
  const teste = useRef();
  const [currentAction, setCurrentAction] = useState('');

  useEffect(() => {
    teste.current.style.setProperty('--lengthArray', currentArray.length)
    teste.current.style.setProperty('--outroTest', Math.floor(currentArray.length / 2) * 62.5)
  }, [currentArray.length])
  

  const prevState = () => {
    teste.current.classList.remove('teste');
    setCurrentArray((old) => old
      .map((_, i) => i===0 ? old[old.length -1] : old[i -1])
    )
  }

  const nextState = () => {
    teste.current.classList.remove('teste');
    setCurrentArray((old) => old
      .map((_, i) => i===old.length -1 ? old[0] : old[i+ 1])
    );
  }

  const prevAnimation = () => {
    teste.current.classList.add('teste');  
    teste.current.style.setProperty('--outra', '-93vw');
    setCurrentAction('prev');
  }

  const nextAnimation = () => {
    teste.current.classList.add('teste');
    teste.current.style.setProperty('--outra', '93vw');
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
