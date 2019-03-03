import React, { Component } from 'react';
import './App.css';
import {get} from 'axios';
import NewUser from './components/NewUser';
import Tales from './components/Tales';
import { getShuffledIndexes, CHUNK_SIZE } from './helpers.js';

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
      console.log("load user");
      const { user, to_vote } = JSON.parse(localStorage.getItem(USER_INFO));
      this.state = { user, to_vote, ...initialState }
    }
  }

  getTales() {
    get("https://firebasestorage.googleapis.com/v0/b/microtales-ba.appspot.com/o/tales.csv?alt=media&token=ddd8a368-8c21-4ac0-963e-2e14ac82df4b")
      .then(response => {
        const resp = response.data.split("\n");

        const tales = resp
          .filter(e => e)
          .map(e => e.replace(/\"/g, "").replace(/\\n/, "\n")); //clean data

        this.setState({ tales });
        localStorage.setItem(TALES, JSON.stringify(tales));
      })
      .catch(err => {
        console.log(err)
      })
  }

  userUpdated(user) {
    // TODO: Show welcome message

    const to_vote = getShuffledIndexes(this.state.tales.length);

    this.setState({ user, to_vote })
    localStorage.setItem(USER_INFO, JSON.stringify({ user, to_vote }));

    console.log("userUpdated");
  }

  chunkVoted(chunk, scores) {
    console.log('Finish with chunk!', chunk, scores);
    let {to_vote} = this.state;
    to_vote.shift();
    this.setState({ to_vote })
    // TODO:
    // 1. delete first from to_vote
    //   - update it in localStorage
    // 2. submit scores to db
  }

  render() {
    const curr_chunk = this.state.to_vote[0];
    const chunkIdx = curr_chunk * CHUNK_SIZE;
    const view = this.state.user ?
      <Tales
        tales={this.state.tales.slice(chunkIdx, chunkIdx + CHUNK_SIZE )}
        chunk={curr_chunk}
        doneVoting={this.chunkVoted}
      /> :
      <NewUser userUpdated={this.userUpdated} localDB={USER_INFO} />;

    return (
      <div className="App">
        {view}
      </div>
    );
  }
}

export default App;
