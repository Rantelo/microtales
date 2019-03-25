import React, { Component } from 'react';
import { CHUNK_SIZE, Trophy } from '../helpers';

const Card = ({children, vote, progress}) => (
  <div className="card card-tale">

    <div className="progress">
      <div id="outer-progress-bar" className="progress-bar">
        <div style={{ width: progress }}></div>
      </div>
      <Trophy />
    </div>

    <div className="content">
      {children}
    </div>

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
    this.getProgress = this.getProgress.bind(this);
    this.state = {
      idx: 0,
      votes: [],
      progress: 0
    }
  }

  vote(vote) {
    let { votes, idx } = this.state;
    votes[idx] = vote;

    if (
      (this.props.tales.length !== CHUNK_SIZE && votes.length === this.props.tales.length) ||
      (votes.length >= CHUNK_SIZE)
    ) {
      this.setState(
        { idx: 0, votes: [] },
        this.props.doneVoting(this.props.chunk, votes)
      )
    } else {
      this.getProgress();
      this.setState({ idx: idx + 1, votes });
    }
  }

  getProgress() {
    setTimeout(() => {
      const progress_length = document.getElementById("outer-progress-bar").clientWidth;
      const {totalTales, leftToVote} = this.props;
      const total_chunks = Math.ceil(totalTales/CHUNK_SIZE);
      const progress = (((total_chunks - leftToVote) * progress_length)/(total_chunks));
      this.setState({ progress });
    }, 200); // ComponentDidMount is not executing after first render... :S
    // It seems to be an unsolved bug: https://github.com/facebook/react/issues/5979
  }

  componentDidMount() {
    this.getProgress();
  }

  render() {

    return (
      <Card vote={this.vote} progress={this.state.progress}>
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
