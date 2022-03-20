import './style.css';
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function App({ widthSlide, array, marginLeftRigth }) {
  const [currentArray, setCurrentArray] = useState(array);
  const cardsRef = useRef(HTMLDivElement);
  const { current: { classList, style } } = cardsRef;
  const [currentAction, setCurrentAction] = useState('');

  useEffect(() => {
    const setStyleProperties = () => {
      const { current: { style } } = cardsRef;
      style.setProperty('--lengthArray', currentArray.length);
      style.setProperty('--widthSlide', widthSlide);
      style.setProperty('--MarginLeftRigh', marginLeftRigth);
    }

    const setArrayMinimumSize = () => {
      setCurrentArray((old) => old.length < 5
      ? Array.from({ length: old.length * 2 })
        .map((_current, index) => old.length - 1 < index ? old[index - old.length] : old[index])
      : old);
    }

    setStyleProperties();
    setArrayMinimumSize();
  }, [currentArray.length, widthSlide, marginLeftRigth]);

  const prevState = () => {
    classList.remove('animationSlide');
    setCurrentArray((old) => old
      .map((_current, index) => index === 0 ? old[old.length - 1] : old[index - 1])
    )
  }

  const nextState = () => {
    classList.remove('animationSlide');
    setCurrentArray((old) => old
      .map((_current, index) => index === old.length - 1 ? old[0] : old[index + 1])
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

  const verifyAction = () => {
    return currentAction === 'prev' ? prevState() : nextState();
  }

  return (
    <div className="App">
      <button onClick={ prevAnimation }>
        Prev
      </button>

      <div
        onAnimationEnd={ verifyAction }
        ref={ cardsRef }
        className="cards_container"
      >
        { currentArray.map((element, index) => (
          <div
            key={ index }
            id={ index }
            className='card'
          >
            <img
              src={ element.img }
              width="100%"
              className='img_backGround'
              alt=""
            />
            <h3 className="title">
              { element.title }
            </h3>
          </div>
          ))
        }
      </div>
      
      <button className="btn-next" onClick={ nextAnimation }>
        Next
      </button>
    </div>
  );
}

App.propTypes = {
  array: PropTypes.arrayOf(PropTypes.any),
  widthSlide: PropTypes.string,
  marginLeftRigth: PropTypes.string,
}

App.defaultProps = {
  widthSlide: '50vw',
  marginLeftRigth: '20px',
  array: [
    {
      img: 'https://images7.alphacoders.com/381/thumb-1920-381091.png',
      title: 'Draven'
    },
    {
      img: 'https://3.bp.blogspot.com/-oXdBvSQrtvI/XT0JpIKvIOI/AAAAAAAAJ80/SJTXF7wViiQG9R-CDnzBmlNR0OBGCjlMgCLcBGAs/w919/riven-lol-dawnbringer-splash-art-uhdpaper.com-4K-444-wp.thumbnail.jpg',
      title: 'Riven'
    },
    {
      img: 'https://4.bp.blogspot.com/-NuSmmm8DNbQ/Xhim8bRWwtI/AAAAAAAATOc/-xusgk4771YEsrdB-6QAZvw-GqjK2mbKgCLcBGAsYHQ/w919/kaisa-lol-season-2020-uhdpaper.com-4K-5.1825-wp.thumbnail.jpg',
      title: 'kaisa'
    },
  ],
}

export default App;
