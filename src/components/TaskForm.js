import React, { Component } from "react";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: false,
    };
  }
  componentWillMount() {
    console.log(this.props);
    if (this.props.task) {
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.task) {
      this.setState({
        id: nextProps.task.id,
        name: nextProps.task.name,
        status: nextProps.task.status,
      });
    } else if (!nextProps.task) {
      console.log("Sửa->thêm");
    }
  }
  onCloseForm = () => {
    this.props.onCloseForm();
  };
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if (name === "status") {
      value = target.value === "true" ? true : false;
    }
    this.setState({
      [name]: value,
    });
  };
  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.onClear();
    this.onCloseForm();
  };
  onClear = () => {
    this.setState({
      name: "",
      status: false,
    });
  };
  render() {
    var { id } = this.state;
    console.log(id);
    return (
      <div className="panel panel-warning">
        <div className="panel-heading d-flex justify-content-between">
          <h3 className="panel-title">
            {id !== "" ? "Update Task" : "Add Task"}
          </h3>
          <span
            className="fa fa-times-circle text-right"
            onClick={this.onCloseForm}
          ></span>
        </div>
        <div class="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <label>Status:</label>
            <select
              className="form-control"
              name="status"
              value={this.state.status}
              onChange={this.onChange}
            >
              <option value={true}>Active</option>
              <option value={false}>Hide</option>
            </select>
            <br />
            <div class="text-center">
              <button type="submit" class="btn btn-warning mr-4">
                <span className="fa fa-plus mr-2"></span>
                Save
              </button>
              <button
                type="button"
                class="btn btn-danger"
                onClick={this.onClear}
              >
                <span className="fa fa-close mr-2"></span>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm;
