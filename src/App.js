import React, { Component } from 'react';
import './App.css';

const Card = ({children}) => (
  <div className="card">
    <div className="content">
      {children}
    </div>

    <div className="actions">
      <a className="nope"
        onClick={() => console.log('clicked')} >
        meeh...
      </a>
      <a className="yeap"
        onClick={() => console.log('clicked')} >
        like it!
      </a>
    </div>
  </div>
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Card>Que esta pasando</Card>
      </div>
    );
  }
}

export default App;
