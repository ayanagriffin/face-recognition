import React, { Component } from "react";

export class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rankingInfo: [],
    };
  }
  componentDidMount() {
    fetch("http://localhost:3000/leaderboard")
      .then((res) => res.json())
      .then((ranks) => {
        return ranks.map((user, i) => {
          fetch(`http://localhost:3000/rank/${user.id}`)
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
              <li key={rank.id}>{rank.rank}. {rank.name} with {rank.entries} faces detected</li>
          );
        })}
      </ul>
    );
  }
}

export default Leaderboard;
