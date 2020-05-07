import React, { Component } from "react";
import { render } from "react-dom";

class StudentActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student_id: localStorage.getItem(this.props.code),
      activity_id: undefined,
      class_id: undefined,
      name: "",
      title: "",
      prompt: "",
      screens: [],
      order: 0,
    };
    this.ggbApp = new GGBApplet(
      {
        appName: "geometry",
        width: 800,
        height: 600,
        showToolBar: true,
        showAlgebraInput: true,
        showMenuBar: true,
      },
      true
    );
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
    this.handleScreenSubmit = this.handleScreenSubmit.bind(this);
    this.handleNextSubmit = this.handleNextSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleNameSubmit(event) {
    event.preventDefault();
    this.createStudent();
  }

  handleScreenSubmit(event) {
    var active_studentscreen = this.state.active_screen.student_screens.filter(
      (studentscreen_id) => {
        return this.state.student.screens.includes(studentscreen_id);
      }
    )[0];
    this.patchStudentScreen(active_studentscreen, "D");
  }

  handleNextSubmit(event) {
    if (this.state.order + 1 < this.state.screens.length) {
      this.setState({ order: this.state.order + 1 });
    }
    this.updateActiveScreen();
  }

  componentDidMount() {
    this.tryFetchStudent().then(() => this.fetchActivity());
    this.ggbApp.inject("ggb-element");
  }

  tryFetchStudent() {
    if (this.state.student_id === null) {
      return Promise.resolve();
    }
    return fetch("/api/student/" + this.state.student_id)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((student) => {
        this.setState({ student: student });
      });
  }

  fetchActivity() {
    return fetch("/api/class/" + this.props.code)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((activity_class) => {
        this.setState({ class_id: activity_class.id });
        fetch("/api/activity/" + activity_class.id)
          .then((response) => {
            console.log(response);
            return response.json();
          })
          .then((activity) => {
            this.setState({ activity_id: activity.id, title: activity.name });
            activity.screens.forEach((screen_id) => {
              fetch("/api/screen/" + screen_id)
                .then((response) => {
                  console.log(response);
                  return response.json();
                })
                .then((screen) => {
                  this.setState({ screens: this.state.screens.concat(screen) });
                  this.updateActiveScreen();
                  this.updateStudentScreens();
                });
            });
          });
      });
  }

  createStudent() {
    var data = {
      name: this.state.name,
      activity_class: this.state.class_id,
      screens: [],
    };
    console.log(this.state);
    console.log("Creating student " + JSON.stringify(data));
    fetch("/api/student/", {
      method: "POST",
      credentials: "include",
      cache: "no-cache",
      mode: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((student) => {
        console.log(student);
        localStorage.setItem(this.props.code, student.id);
        this.setState({ student_id: student.id, student: student });
        this.updateStudentScreens();
      });
  }

  updateActiveScreen() {
    var index = 0;
    var screen;
    while (index < this.state.screens.length) {
      if (this.state.screens[index].order == this.state.order) {
        screen = this.state.screens[index];
        break;
      }
      index++;
    }
    if (screen !== undefined) {
      this.setState({ active_screen: screen, prompt: screen.prompt });
    }
  }

  updateStudentScreens() {
    if (
      this.state.student === undefined ||
      this.state.student.screens.length != this.state.screens.length
    ) {
      return;
    }
    this.state.student.screens.forEach((studentscreen_id) => {
      fetch("/api/studentscreen/" + studentscreen_id)
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((studentscreen) => {
          this.setState({
            screens: this.state.screens.map((screen) => {
              if (screen.student_screens.includes(studentscreen_id)) {
                return {
                  this_studentscreen_id: studentscreen_id,
                  data: studentscreen.geogebra_data,
                  ...screen,
                };
              } else {
                return screen;
              }
            }),
          });
        });
    });
  }

  patchStudentScreen(studentscreen, new_status) {
    ggbApplet.getBase64((ggb_data) => {
      var data = {
        id: studentscreen,
        geogebra_data: ggb_data,
      };
      if (screen.state != new_status) {
        data.status = new_status;
      }
      console.log(data);
      fetch("/api/studentscreen/" + studentscreen + "/", {
        method: "PATCH",
        credentials: "include",
        cache: "no-cache",
        mode: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((studentscreen) => {
          console.log(studentscreen);
        });
    });
  }

  render() {
    return (
      <div>
        {this.state.student_id === null && (
          <form onSubmit={this.handleNameSubmit}>
            <label>
              <span>Please enter your name:</span>
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleNameChange}
              />
            </label>
            <p></p>
            <input type="submit" value="Go!" />
          </form>
        )}
        <h1>{this.state.title}</h1>
        <p>{this.state.prompt}</p>
        <div id="ggb-element"></div>
        <button onClick={this.handleScreenSubmit}>Submit</button>
        <button onClick={this.handleNextSubmit}>Next</button>
      </div>
    );
  }
}

render(<StudentActivity {...window.props} />, window.mount_point);
