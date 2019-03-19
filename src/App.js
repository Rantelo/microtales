import React, { Component } from 'react';
import './App.css';
import {get} from 'axios';
import NewUser from './components/NewUser';
import Tales from './components/Tales';
import Thanks from './components/Thanks';
import { getShuffledIndexes, CHUNK_SIZE } from './helpers.js';
import fire from './config/fire';

const TALES = "talesDB";
const USER_INFO = "microtalesDB";

class App extends Component {
  constructor(props) {
    super(props);

    this.userUpdated = this.userUpdated.bind(this);
    this.getTales = this.getTales.bind(this);
    this.chunkVoted = this.chunkVoted.bind(this);

    let initialState = {};

    if (localStorage.getItem(TALES) == null) {
      this.getTales();
    } else {
      initialState.tales = JSON.parse(localStorage.getItem(TALES));
    }

    if (localStorage.getItem(USER_INFO) == null) {
      this.state = { ...initialState, user: null, to_vote: null }
    } else {
      const { user, to_vote } = JSON.parse(localStorage.getItem(USER_INFO));
      this.state = { user, to_vote, ...initialState }
    }
  }

  getTales() {
    fire.storage().ref('tales.csv').getDownloadURL()
      .then(e => {
        get(e)
          .then(response => {
            const resp = response.data.split("\n");

            const tales = resp
              .filter(e => e)
            // eslint-disable-next-line
              .map(e => e.replace(/\"/g, "").replace(/\\n/g, "\n")); //clean data

            this.setState({ tales });
            localStorage.setItem(TALES, JSON.stringify(tales));
          })
          .catch(err => {
            console.log(err)
          })
      })
  }

  userUpdated(user) {
    // TODO: Show welcome message

    const to_vote = getShuffledIndexes(this.state.tales.length);

    this.setState({ user, to_vote })
    localStorage.setItem(USER_INFO, JSON.stringify({ user, to_vote }));

    fire.database().ref(`users/${user.id}`).set({
      name: user.name,
      id: user.id,
      to_vote
    })
  }

  chunkVoted(chunk, scores) {
    let {to_vote} = this.state;
    to_vote.shift();
    this.setState({ to_vote })
    let { user } = JSON.parse(localStorage.getItem(USER_INFO));
    localStorage.setItem(USER_INFO, JSON.stringify({user, to_vote}));
    fire.database().ref(`users/${this.state.user.id}/votes/${chunk}`).set(scores)
  }

  render() {
    const curr_chunk = this.state.to_vote ? this.state.to_vote[0] : 0;
    const chunkIdx = curr_chunk * CHUNK_SIZE;

    const view = this.state.user ?
      (
        (this.state.to_vote == null || this.state.to_vote.length === 0) ?
        <Thanks /> :
        (
          <Tales
            tales={this.state.tales.slice(chunkIdx, chunkIdx + CHUNK_SIZE )}
            chunk={curr_chunk}
            doneVoting={this.chunkVoted}
          />
        )
      ) :
      <NewUser userUpdated={this.userUpdated} />;

    return (
      <div className="App">
        {view}
      </div>
    );
  }
}

export default App;
