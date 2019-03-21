import React, { Component, createRef } from 'react';
import { Smile } from '../helpers';
import me from '../images/me.jpg';

let h;
class NewUser extends Component {
  constructor(props) {
    super(props);

    this.submitName = this.submitName.bind(this);
    this.name = createRef();
  }

  submitName() {
    this.props.userUpdated({
      name: this.name.current.value,
      id: Math.random().toString(36).substring(2,15) //random id
    });
  }

  componentWillMount() {
    h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }

  // TODO: add emojis
  render() {
    return (
      <div className="card login" style={{height: (h*0.85)}}>
        <img src={me} alt="Bárbara Antelo" />
        <p>¡Hola! Soy Bárbara Antelo</p>
        <p>Bienvenid@ a mi nuevo proyecto!</p>
        <p> Estoy creando un libro de microcuentos y con tu ayuda estoy segura que lograremos ¡el mejor libro de todos!</p>
        <p className="upper"> Sólo dale <i className="yeap">Me gusta!</i> si la historia te gusta
        y <i className="nope">meeh..</i> si no.</p>
        <p>¡Gracias por tu ayuda!</p>
        <input type="text" ref={this.name} placeholder="Ingresa tu nombre" />
        <button onClick={this.submitName}>Guardar</button>
        <p style={{fontSize: 8, textAlign: "right"}}>Tu nombre vendrá impreso en el libro <Smile size={8} /></p>
      </div>
    )
  }
}

export default NewUser;
