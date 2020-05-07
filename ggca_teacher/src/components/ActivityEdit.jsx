import React, { Component } from "react";
import { render } from "react-dom";

class ActivityEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      screens: [],
      loaded: false,
      placeholder: "Loading",
    };
  }

  componentDidMount() {
    fetch("/api/activity/" + this.props.id)
      .then((response) => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        document.title = data.name + " | " + document.title;
        this.setState(() => {
          return {
            name: data.name,
            loaded: true,
          };
        });
        data.screens.forEach((id) => {
          fetch("/api/screen/" + id)
            .then((response) => {
              if (response.status > 400) {
                return this.setState(() => {
                  return { placeholder: "Something went wrong!" };
                });
              }
              return response.json();
            })
            .then((screen) => {
              console.log(screen);
              this.setState(() => {
                return {
                  screens: this.state.screens
                    .concat([screen])
                    .sort((fst, snd) => fst.order - snd.order),
                  loaded: true,
                };
              });
            });
        });
      });
  }

  updateScreen(screen) {}

  render() {
    return (
      <ol>
        {this.state.screens.map((screen) => {
          return (
            <li key={screen.id}>
              <input type="text" defaultValue={screen.prompt} />
              <button onClick={() => this.updateScreen(screen)}>Update</button>
            </li>
          );
        })}
      </ol>
    );
  }
}

render(<ActivityEdit {...window.props} />, window.mount_point);
