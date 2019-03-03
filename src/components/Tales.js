import React, { Component } from 'react';
import { CHUNK_SIZE }from '../helpers';

const Card = ({children, vote}) => (
  <div className="card">
    <div className="content">
      {children}
    </div>

    <div className="actions">
      <button className="nope"
        onClick={() => vote(false)} >
        meeh...
      </button>
      <button className="yeap"
        onClick={() => vote(true)} >
        like it!
      </button>
    </div>
  </div>
);

class Tales extends Component {
  constructor(props) {
    super(props);

    this.vote = this.vote.bind(this);
    this.state = {
      idx: 0,
      votes: []
    }
  }

  vote(vote) {
    let { votes, idx } = this.state;
    votes[idx] = vote;

    if (votes.length >= CHUNK_SIZE) {
      console.log("IM HERE");
      this.props.doneVoting(this.props.chunk, votes);
    } else {
      this.setState({ idx: idx + 1, votes });
    }
  }

  render() {
    return (
      <Card vote={this.vote}>
        {
          this.props.tales[this.state.idx]
            .split("\n")
            .map((e, i) => <p key={`l-${i}`}>{e}</p>)
        }
      </Card>
    );
  }
}

export default Tales;
