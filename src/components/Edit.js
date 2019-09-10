import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../constants";
import { UserContext } from "../UserContext";

class Edit extends Component {
  state = {
    changes: {},
    doctors: [],
    appointment: {}
  };

  componentDidMount() {
    const { appointment } = this.props;

    this.setState({ appointment });

    axios
      .get(`${API_URL}/user/doctors`, { withCredentials: true })
      .then(res => {
        console.log(res.data);
        this.setState({ doctors: res.data });
      })
      .catch(err => {
        this.setState({ errors: err.response.data.errors });
      });
  }

  componentDidUpdate(prevProps) {
    const { appointment } = this.props;

    if (prevProps.appointment !== appointment) {
      this.setState({ appointment });
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
      .post(`${API_URL}/auth/Edit`, newUser, { withCredentials: true })
      .then(res => {
        this.setState({ loggedIn: true }, () => {
          this.props.fetchUser();

          // console.log(this.props);
          this.props.history.push("Edit");
        });
      })
      .catch(err => {
        this.setState({ errors: err.response.data.errors });
      });
  };

  updateAppointment = event => {
    event.preventDefault();

    const { appointment } = this.props;
    const { changes } = this.state;

    axios
      .put(`${API_URL}/appointments/${appointment._id}`, changes, {
        withCredentials: true
      })
      .then(res => {
        this.props.fetchAppointments();
      })
      .catch(err => {
        this.setState({ errors: err.response.data.errors });
      });
  };

  render() {
    const { appointment, changes } = this.state;

    return (
      <div className="wrapper">
        <div className="row">
          <div
            className="modal"
            id="editAppointment"
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Appointment</h5>
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
                        value={appointment.Doctor}
                        onChange={event => {
                          changes.doctor_id = event.target.value;
                          appointment.doctor_id = event.target.value;
                          this.setState({ changes, appointment });
                        }}
                      >
                        <option>Select Doctor</option>
                        {this.state.doctors.map(doctor => {
                          return (
                            <option
                              value={doctor._id}
                              selected={
                                doctor._id === appointment.Doctor
                                  ? "selected"
                                  : ""
                              }
                            >
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
                          changes.start_time = event.target.value;
                          appointment.start_time = event.target.value;
                          this.setState({ changes, appointment });
                        }}
                        placeholder="Sep 10, 12pm"
                        value={
                          this.state.changes.start_time ||
                          appointment.start_time
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="end_time">End Time</label>
                      <input
                        type="text"
                        className="form-control"
                        id="end_time"
                        onChange={event => {
                          changes.end_time = event.target.value;
                          appointment.end_time = event.target.value;
                          this.setState({ changes, appointment });
                        }}
                        value={
                          this.state.changes.end_time || appointment.end_time
                        }
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
                          appointment.purpose = event.target.value;
                          changes.purpose = event.target.value;
                          this.setState({ changes, appointment });
                        }}
                        value={
                          this.state.changes.purpose || appointment.purpose
                        }
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
                    onClick={this.updateAppointment}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
