import React, { Component } from "react";

export class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rankingInfo: [],
    };
  }
  componentDidMount() {
    fetch("https://sheltered-journey-89423.herokuapp.com/leaderboard")
      .then((res) => res.json())
      .then((ranks) => {
        return ranks.map((user, i) => {
          fetch(`https://sheltered-journey-89423.herokuapp.com/rank/${user.id}`)
            .then((res) => res.json())
            .then((rank) => {
              ranks[i].rank = rank;
              this.setState({ rankingInfo: ranks });
            });
        });
      });
  }

  render() {
    return (
      <ul className="list">
        {this.state.rankingInfo.map((rank) => {
          return (
              <li className="f4 mb2" key={rank.id}>{rank.rank}. {rank.name} with {rank.entries} {rank.entries === '1' ? 'face' : 'faces'}  detected</li>
          );
        })}
      </ul>
    );
  }
}

export default Leaderboard;
