import React, { Component } from 'react';
import './App.css';
import {get} from 'axios';
import NewUser from './components/NewUser';

const Card = ({children}) => (
  <div className="card">
    <div className="content">
      {children}
    </div>

    <div className="actions">
      <button className="nope"
        onClick={() => console.log('clicked')} >
        meeh...
      </button>
      <button className="yeap"
        onClick={() => console.log('clicked')} >
        like it!
      </button>
    </div>
  </div>
)

const Tales = () => <Card> Que esta pasando </Card>;
const TALES = "talesDB";
const USER_INFO = "microtalesDB";

class App extends Component {
  constructor(props) {
    super(props);

    this.userUpdated = this.userUpdated.bind(this);

    if (localStorage.getItem(TALES) == null) {
      get("https://firebasestorage.googleapis.com/v0/b/microtales-ba.appspot.com/o/tales.csv?alt=media&token=ddd8a368-8c21-4ac0-963e-2e14ac82df4b")
        .then(response => {
          const tales = response.data.split("\n");
          this.state = { tales };
          localStorage.setItem(TALES, JSON.stringify(tales));
        })
        .catch(err => {
          console.log(err)
        })
    }

    if (localStorage.getItem(USER_INFO) == null) {
      this.state = { user: null, to_vote: null }
    } else {
      console.log("load user");
      const { user, to_vote } = JSON.parse(localStorage.getItem(USER_INFO));
      this.state = { user, to_vote }
    }
  }

  userUpdated() {
    // Show welcome message
    // getuser from localstorage and add shuffled indexes
    // update user in state so view can change

    console.log("userUpdated");

  }

  render() {
    const view = this.state.user ?
      <Tales /> :
      <NewUser userUpdated={this.userUpdated} localDB={USER_INFO} />;

    return (
      <div className="App">
        {view}
      </div>
    );
  }
}

export default App;
