import React, { useContext } from 'react';
import MyProvider from './myContext';

export default function Card() {
  const conxtet = useContext(MyProvider)
  return (
    <div>
      <img src={conxtet.img} width="100%" className='img_backGround' alt="" />
      <h3 className="title">{conxtet.title}</h3>
      <h3 className="title">{conxtet.title}</h3>
    </div>
  )
}
