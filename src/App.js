import React, { Component } from "react";
import "./App.css";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
// import Clarifai from "clarifai";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Leaderboard from "./components/Leaderboard/Leaderboard";

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
    rank: "",
  },
};
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data, rank) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
        rank: rank,
      },
    });
  };

  calculateFaceLocations = (data) => {
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    let boundingBoxes = [];

    for (let i = 0; i < data.outputs[0].data.regions.length; i++) {
      let face = data.outputs[0].data.regions[i].region_info.bounding_box;
      boundingBoxes.push({
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - face.right_col * width,
        bottomRow: height - face.bottom_row * height,
      });
    }
    return boundingBoxes;
  };

  displayFaceBoxes = (boxes) => {
    this.setState({ boxes });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    fetch("https://sheltered-journey-89423.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        let boxes = this.calculateFaceLocations(response);
        this.displayFaceBoxes(boxes);
        return boxes.length;
      })
      .then((numBoxes) => {
        fetch("https://sheltered-journey-89423.herokuapp.com/image", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: this.state.user.id,
            faces: numBoxes,
          }),
        })
          .then((response) => response.json())
          .then((count) => {
            // prevents from completing overwriting the user object

            fetch(`https://sheltered-journey-89423.herokuapp.com/rank/${this.state.user.id}`)
              .then((res) => res.json())
              .then((rank) => {
                this.setState(
                  Object.assign(this.state.user, { entries: count, rank: rank })
                );
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({ imageUrl: this.state.input });
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, boxes, user } = this.state;
    return (
      <div className="App">
        <Particles className="particles" />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            {/* <Logo /> */}
            <Rank name={user.name} entries={user.entries} rank={user.rank} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" || route === "signout" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : route === "register" ? (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        ) : (
          <Leaderboard user={user} />
        )}
      </div>
    );
  }
}

export default App;
