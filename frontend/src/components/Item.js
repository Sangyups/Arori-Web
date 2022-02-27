import React from 'react';

const Item = ({ name, desc, price }) => {
  return (
    <div className="item-container">
      <span>Name: {name}</span>
      <div>Description: {desc}</div>
      <span>Price: {price}</span>
    </div>
  );
};

export default Item;
