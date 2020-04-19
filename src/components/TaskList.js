import React, { Component } from "react";
import TaskItem from "./TaskItem";
class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1, //all = -1, active=1, hide=0
    };
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.props.onFilter(
      name === "filterName" ? value : this.state.filterName,
      name === "filterStatus" ? value : this.state.filterStatus
    );
    this.setState({
      filterName: name,
      filterStatus: value,
    });
  };

  render() {
    var { tasks } = this.props;
    var { filterName, filterStatus } = this.state;
    console.log(filterStatus);
    var elmTasks = tasks.map((task, index) => {
      return (
        <TaskItem
          key={tasks.id}
          index={index}
          task={task}
          onUpdateStatus={this.props.onUpdateStatus}
          onDelete={this.props.onDelete}
          onUpdate={this.props.onUpdate}
        />
      );
    });
    return (
      <div className="row mt-5">
        <div className="col-12">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th className="text-center">Name</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="filterName"
                    value={filterName}
                    onChange={this.onChange}
                  />
                </td>
                <td>
                  <select
                    className="form-control"
                    name="filterStatus"
                    value={filterStatus}
                    onChange={this.onChange}
                  >
                    <option value={-1}>All</option>
                    <option value={0}>Hide</option>
                    <option value={1}>Active</option>
                  </select>
                </td>
                <td></td>
              </tr>
              {elmTasks}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TaskList;
