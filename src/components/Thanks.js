import React from 'react';
import { getUserName, Heart, Smile } from '../helpers';
import { USER_INFO } from '../App';

const Thanks = (props) => (
  <div className="card login">
    <p> ¡Muchas gracias! </p>
    <p> <Heart size={40} /></p>
    <p>Gracias por tomarte el tiempo de leer hasta el final y ayudarme a seleccionar los mejores microcuentos.
    </p>
    <p> Tu apoyo me ayuda a seguir creando, imaginando y soñando. </p>
    <p> ¡Muchas gracias {getUserName(USER_INFO)} <Heart />!</p>
    <p> Encuentra tu nombre en los agradecimientos del libro impreso <Smile /></p>
  </div>
);

export default Thanks;
