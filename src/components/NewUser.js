import React, { Component, createRef } from 'react';

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

  render() {
    return (
      <div>
        <p>¡Hola! En esta página podrás ayudarme a construir mi nuevo libro. Te pido la mayor sinceridad posible al votar por los microcuentos.</p>
        <p>¡Gracias por tu ayuda!</p>
        <input type="text" ref={this.name} placeholder="Ingresa tu nombre" />
        <button onClick={this.submitName}>Guardar</button>
      </div>
    )
  }
}

export default NewUser;