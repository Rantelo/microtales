import React, { Component } from 'react';
import { CHUNK_SIZE } from '../helpers';

const writeSomething = () => {
  localStorage.clear();
}

const Card = ({children, vote}) => (
  <div className="card card-tale">
    <div className="content">
      {children}
    </div>

    <button onClick={writeSomething}>Delete local</button>
    <div className="actions">
      <div className="nope"
        onClick={() => vote(false)} >
        <span aria-label="dislike" role="img">👎</span> meeh...
      </div>
      <div className="yeap"
        onClick={() => vote(true)} >
        <span aria-label="like" role="img">👍</span> Me gusta!
      </div>
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
      this.setState(
        { idx: 0, votes: [] },
        this.props.doneVoting(this.props.chunk, votes)
      )
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
