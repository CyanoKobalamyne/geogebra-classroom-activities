import React, { Component } from "react";
import { render } from "react-dom";

class Class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      code: undefined,
      screens: [],
      students: [],
    };
  }

  componentDidMount() {
    fetch("/api/class/" + this.props.id)
      .then((response) => {
        return response.json();
      })
      .then((activity_class) => {
        console.log(activity_class);
        this.setState(() => {
          return {
            code: activity_class.code,
          };
        });
        fetch("/api/activity/" + activity_class.activity)
          .then((response) => {
            return response.json();
          })
          .then((activity) => {
            console.log(activity);
            document.title = activity.name + " | " + document.title;
            this.setState(() => {
              return {
                name: activity.name,
              };
            });
            activity.screens.forEach((screen_id) => {
              fetch("/api/screen/" + screen_id)
                .then((response) => {
                  return response.json();
                })
                .then((screen) => {
                  console.log(screen);
                  this.setState(() => {
                    return {
                      screens: this.state.screens
                        .concat([screen])
                        .sort((fst, snd) => fst.order - snd.order),
                    };
                  });
                });
            });
          });
        activity_class.students.forEach((student_id) => {
          fetch("/api/student/" + student_id)
            .then((response) => {
              return response.json();
            })
            .then((student) => {
              console.log(student);
              this.setState(() => {
                return {
                  students: this.state.students.concat([
                    { student: student, screens: [] },
                  ]),
                };
              });
              student.screens.forEach((studentscreen_id) => {
                fetch("/api/studentscreen/" + studentscreen_id)
                  .then((response) => {
                    console.log(response);
                    return response.json();
                  })
                  .then((studentscreen) => {
                    console.log(studentscreen);
                    this.setState(() => {
                      return {
                        students: this.state.students.map((student) => {
                          if (student.student.id == studentscreen.student) {
                            return {
                              student: student.student,
                              screens: student.screens.concat(studentscreen),
                            };
                          } else {
                            return student;
                          }
                        }),
                      };
                    });
                  });
              });
            });
        });
      });
  }

  render() {
    return (
      <div>
        <p>{this.state.code}</p>
        <table>
          <thead>
            <tr key="header">
              <td key="label">Student Name</td>
              {this.state.screens.map((screen) => {
                return <td key={screen.id}>{screen.id}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {this.state.students.map((student) => {
              return (
                <tr key={student.id}>
                  <td>{student.student.name}</td>
                  {student.screens.map((studentscreen) => {
                    return <td>{studentscreen.status}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

render(<Class {...window.props} />, window.mount_point);
