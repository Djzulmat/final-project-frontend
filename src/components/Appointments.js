import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../constants";
import { UserContext } from "../UserContext";
import Edit from "./Edit";

class Appointments extends Component {
  state = {
    appointment: {},
    doctors: [],
    appointments: [],
    editAppointment: {}
  };

  componentDidMount() {
    const { loggedIn } = this.context;
    if (!loggedIn) {
      this.props.history.push("register");
      return;
    }

    axios
      .get(`${API_URL}/user/doctors`, { withCredentials: true })
      .then(res => {
        console.log(res.data);
        this.setState({ doctors: res.data });
      })
      .catch(err => {
        this.setState({ errors: err.response.data.errors });
      });

    this.fetchAppointments();
  }

  fetchAppointments = () => {
    axios
      .get(`${API_URL}/appointments`, { withCredentials: true })
      .then(res => {
        this.setState({ appointments: res.data });
      })
      .catch(err => {
        this.setState({ errors: err.response.data.errors });
      });
  };

  componentDidUpdate(prevProps) {
    const { loggedIn } = this.context;

    if (!loggedIn) {
      this.props.history.push("/");
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const newUser = this.state;
    axios
      .post(`${API_URL}/auth/Appointments`, newUser, { withCredentials: true })
      .then(res => {
        this.setState({ loggedIn: true }, () => {
          this.props.fetchUser();
          // console.log(this.props);
          this.props.history.push("appointments");
        });
      })
      .catch(err => {
        this.setState({ errors: err.response.data.errors });
      });
  };

  openModal = () => {
    window.$(".modal").on("shown.bs.modal", function() {
      window.$("#myInput").trigger("focus");
    });
  };

  deleteAppointment = id => {
    axios
      .delete(`${API_URL}/appointments/${id}`, {
        withCredentials: true
      })
      .then(res => {
        alert("Succesfully deleted appointment");
        this.fetchAppointments();
      })
      .catch(err => {
        this.setState({ errors: err.response.data.errors });
      });
  };

  createAppointment = event => {
    event.preventDefault();

    const appointment = this.state.appointment;

    axios
      .post(`${API_URL}/appointments`, appointment, {
        withCredentials: true
      })
      .then(res => {
        alert("Succesfully created appointment");
        this.setState({ appointment: {} });
        this.fetchAppointments();
      })
      .catch(err => {
        this.setState({ errors: err.response.data.errors });
      });
  };

  getStatusButtons = appointment => {
    const { user } = this.context;
    const { status } = appointment;

    if (user.role === "patient") {
      return status;
    }

    if (status === "pending") {
      return (
        <div>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={() => {
              axios
                .put(
                  `${API_URL}/appointments/${appointment._id}`,
                  { status: "approved" },
                  {
                    withCredentials: true
                  }
                )
                .then(res => {
                  alert("Appointment has been approved");
                  this.fetchAppointments();
                })
                .catch(err => {
                  this.setState({ errors: err.response.data.errors });
                });
            }}
          >
            Approve
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              axios
                .put(
                  `${API_URL}/appointments/${appointment._id}`,
                  { status: "cancelled" },
                  {
                    withCredentials: true
                  }
                )
                .then(res => {
                  alert("Appointment has been canceled");
                  this.fetchAppointments();
                })
                .catch(err => {
                  this.setState({ errors: err.response.data.errors });
                });
            }}
          >
            Cancel
          </button>
        </div>
      );
    } else {
      return status;
    }
  };

  render() {
    const { appointments } = this.state;
    const { user } = this.context;

    return (
      <div className="wrapper">
        <div className="row" style={{ margin: "40px" }}>
          <div className="col-sm-12">
            <h2>Appointments</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Start Time</th>
                  <th scope="col">End Time</th>
                  <th scope="col">Purpose</th>
                  <th scope="col">Status</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(appointment => {
                  return (
                    <tr>
                      <th scope="row">1</th>
                      <td>{appointment.User.first_name}</td>
                      <td>{appointment.User.last_name}</td>
                      <td>{appointment.start_time}</td>
                      <td>{appointment.end_time}</td>
                      <td>{appointment.purpose}</td>
                      <td>{this.getStatusButtons(appointment)}</td>
                      <td>
                        <div
                          className="col-sm-12"
                          style={{
                            display: user.role === "patient" ? "block" : "none"
                          }}
                        >
                          <button
                            type="button"
                            className="btn btn-primary float-right"
                            data-toggle="modal"
                            data-target="#editAppointment"
                            onClick={() => {
                              this.setState({
                                editAppointment: appointment
                              });
                            }}
                          >
                            Edit
                          </button>
                        </div>
                        <button
                          type="button"
                          className="btn btn-secondary float-right"
                          onClick={event => {
                            event.preventDefault();
                            this.deleteAppointment(appointment._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="row"
          style={{
            margin: "40px",
            display: user.role == "patient" ? "block" : "none"
          }}
        >
          <div className="col-sm-12">
            <button
              type="button"
              className="btn btn-primary float-right"
              data-toggle="modal"
              data-target="#newAppointment"
            >
              New Appointment
            </button>
          </div>
        </div>

        <div className="modal" id="newAppointment" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">New Appointment</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <select
                      className="form-control"
                      id="selectDoctor"
                      onChange={event => {
                        const appointment = this.state.appointment;
                        appointment.doctor_id = event.target.value;
                        this.setState({ appointment });
                      }}
                    >
                      <option>Select Doctor</option>
                      {this.state.doctors.map(doctor => {
                        return (
                          <option value={doctor._id}>
                            {[doctor.first_name, doctor.last_name].join(" ")}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="start_time">Start Time</label>
                    <input
                      type="text"
                      className="form-control"
                      id="start_time"
                      onChange={event => {
                        const appointment = this.state.appointment;
                        appointment.start_time = event.target.value;
                        this.setState({ appointment });
                      }}
                      placeholder="Sep 10, 12pm"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="end_time">End Time</label>
                    <input
                      type="text"
                      className="form-control"
                      id="end_time"
                      onChange={event => {
                        const appointment = this.state.appointment;
                        appointment.end_time = event.target.value;
                        this.setState({ appointment });
                      }}
                      placeholder="Sep 10, 2pm"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="purpose">Purpose of visit</label>
                    <textarea
                      className="form-control"
                      id="purpose"
                      rows="3"
                      onChange={event => {
                        const appointment = this.state.appointment;
                        appointment.purpose = event.target.value;
                        this.setState({ appointment });
                      }}
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.createAppointment}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <Edit
          appointment={this.state.editAppointment}
          fetchAppointments={this.fetchAppointments}
        />
      </div>
    );
  }
}

Appointments.contextType = UserContext;

export default Appointments;
