import React, { Component } from "react";
import { render } from "react-dom";

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      classes: [],
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
        data.classes.forEach((id) => {
          fetch("/api/class/" + id)
            .then((response) => {
              if (response.status > 400) {
                return this.setState(() => {
                  return { placeholder: "Something went wrong!" };
                });
              }
              return response.json();
            })
            .then((activity_class) => {
              console.log(activity_class);
              this.setState(() => {
                return {
                  classes: this.state.classes
                    .concat([activity_class])
                    .sort((fst, snd) => snd.created_at - fst.created_at),
                  loaded: true,
                };
              });
            });
        });
      });
  }

  render() {
    return (
      <ol>
        {this.state.classes.map((activity_class) => {
          return (
            <li key={activity_class.id}>
              <span>{activity_class.code}</span>
              <span>{activity_class.created_at}</span>
              <a href={"/teacher/class/" + activity_class.id}>View Dashboard</a>
            </li>
          );
        })}
      </ol>
    );
  }
}

render(<Activity {...window.props} />, window.mount_point);
