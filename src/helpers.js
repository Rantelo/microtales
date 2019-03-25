import React from 'react';
export const CHUNK_SIZE = 10;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // swap elements
  }
}

export const getShuffledIndexes = count => {
  let extra = (count % CHUNK_SIZE === 0) ? 0 : 1;

  let final_lenght = Math.floor(count/CHUNK_SIZE) + extra;
  let indexes = Array(final_lenght).fill(0).map((e,i) => i);
  shuffle(indexes);

  return indexes;
}

export const getUserName = (key) => {
  const { user } = JSON.parse(localStorage.getItem(key))
  return user.name;
}

export const Heart = ({size=15}) => <span aria-label="heart emoji" role="img" style={{fontSize: size}}>❤️</span> ;
export const Smile = ({size=15}) => <span aria-label="smile emoji" role="img" style={{fontSize: size}}>😊</span> ;
export const Trophy = ({size=15}) => <span aria-label="smile emoji" role="img" style={{fontSize: size}}>🏆</span>
