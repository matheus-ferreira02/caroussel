import './style.css';
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyProvider from './myContext';

function Carrocel({widthSlide, array, marginLeftRigh, children}) {
  const [currentArray, setCurrentArray] = useState(array);
  const cardsRef = useRef(HTMLDivElement);
  const { current: { classList, style } } = cardsRef;
  const [currentAction, setCurrentAction] = useState('');

  useEffect(() => { //muda variavei do css
    const { current: { style } } = cardsRef;
    style.setProperty('--lengthArray', currentArray.length)
    style.setProperty('--widthSlide', widthSlide)
    style.setProperty('--MarginLeftRigh', marginLeftRigh)
  }, [currentArray.length, marginLeftRigh, widthSlide])
  
  useEffect(() => { //aumenta o array original para o tamanho minimo
    setCurrentArray((old) => old.length < 5
    ? Array.from({length: old.length * 2}).map((_, i) => old.length - 1 < i ? old[i - old.length] : old[i])
    : old)
  }, [])

  const prevState = () => {

    classList.remove('animationSlide');
    setCurrentArray((old) => old
      .map((_, i) => i===0 ? old[old.length -1] : old[i -1])
    )
  }

  const nextState = () => {
    classList.remove('animationSlide');
    setCurrentArray((old) => old
      .map((_, i) => i===old.length -1 ? old[0] : old[i+ 1])
    );
  }

  const prevAnimation = () => {
    classList.add('animationSlide');  
    style.setProperty('--slide', `-${widthSlide}`);
    setCurrentAction('prev');
  }

  const nextAnimation = () => {
    classList.add('animationSlide');
    style.setProperty('--slide', `${widthSlide}`);
    setCurrentAction('next');
  }

  const verify = () => {
    return currentAction === 'prev' ? prevState() : nextState();
  }

  return (
    <div className="App">
      <button onClick={ prevAnimation }>prev</button>
      <div onAnimationEnd={ verify }
      ref={ cardsRef } className="cards_container">
        { currentArray.map((element, index) => (
          <div
            key={ index }
            id={ index }
            className='card'
            >
              <MyProvider.Provider value={element}>
                {children}
              </MyProvider.Provider>
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

Carrocel.propTypes = {
  array: PropTypes.arrayOf(PropTypes.any),
  widthSlide: PropTypes.string,
  marginLeftRighL: PropTypes.string,
}

Carrocel.defaultProps = {
  widthSlide: '80vw',
  marginLeftRigh: '20px',
  array:[
          {img: 'https://images7.alphacoders.com/381/thumb-1920-381091.png', title: 'Draven'},
          {img: 'https://3.bp.blogspot.com/-oXdBvSQrtvI/XT0JpIKvIOI/AAAAAAAAJ80/SJTXF7wViiQG9R-CDnzBmlNR0OBGCjlMgCLcBGAs/w919/riven-lol-dawnbringer-splash-art-uhdpaper.com-4K-444-wp.thumbnail.jpg', title: 'Riven'},
          {img: 'https://4.bp.blogspot.com/-NuSmmm8DNbQ/Xhim8bRWwtI/AAAAAAAATOc/-xusgk4771YEsrdB-6QAZvw-GqjK2mbKgCLcBGAsYHQ/w919/kaisa-lol-season-2020-uhdpaper.com-4K-5.1825-wp.thumbnail.jpg', title: 'kaisa'},
        ],
}

export default Carrocel;
