import React, { Component } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import _ from "lodash";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: "",
        status: -1,
      },
      keyword: "",
      sortBy: "name",
      sortValue: 1,
    };
  }

  componentWillMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks,
      });
    }
  }

  onToggleForm = () => {
    if (this.state.isDisplayForm && this.state.taskEditing !== null) {
      this.setState({
        isDisplayForm: true,
        taskEditing: null,
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null,
      });
    }
  };

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
    });
  };

  onShowForm = () => {
    this.setState({
      isDisplayForm: true,
    });
  };

  onSubmit = (data) => {
    console.log(data);
    var { tasks } = this.state;
    // ở đây chúng ta cần thêm trường id để định danh cho những task mới thêm vào nha
    // cách sửa sẽ như thế này
    // ID là 1 số gì đó duy nhất, ở đây mình để tạm random bạn có thể snghi thêm nhìu cách khác để có ID
    // Ví dụ như tăng ID từ các task cũ là được r
    if (data.id === "") {
      tasks.push({
        ...data,
        id: Math.floor(Math.random() * 10000),
      });
    } else {
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taskEditing: null,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  onUpdateStatus = (id) => {
    const { tasks } = this.state;
    console.log(id);
    console.log(tasks);

    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.status = !task.status;
      }
      return task;
    });
    this.setState({ tasks: newTasks });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  onDelete = (id) => {
    const newTasks = this.state.tasks.filter((task) => {
      return task.id !== id;
    });
    this.setState({
      tasks: newTasks,
    });
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  onUpdate = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing,
    });
    this.onShowForm();
  };

  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  };

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus,
      },
    });
  };

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword,
    });
  };

  onSelectedItem = (item) => {
    this.setState({
      itemEditing: item,
      isShowingForm: true,
    });
  };

  onSort = async (sortBy, sortValue) => {
    this.setState({
      sort: {
        sortBy: sortBy,
        sortValue: sortValue,
      },
    });
    // await this.setState({
    //   sort: {
    //     sortBy: sortBy,
    //     sortValue: sortValue,
    //   },
    // });
    console.log(this.state);
  };

  render() {
    var {
      tasks,
      isDisplayForm,
      taskEditing,
      filter,
      keyword,
      sortBy,
      sortValue,
    } = this.state;
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return task;
        } else {
          return task.status === (filter.status === 1 ? true : false);
        }
      });
    }
    if (sortBy === "name") {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sortValue;
        else if (a.name < b.name) return -sortValue;
        else return 0;
      });
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return sortValue;
        else if (a.status < b.status) return -sortValue;
        else return 0;
      });
    }
    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }
    var elmTaskForm = isDisplayForm ? (
      <TaskForm
        onSubmit={this.onSubmit}
        onCloseForm={this.onCloseForm}
        task={taskEditing}
      />
    ) : (
      ""
    );
    return (
      <div className="container">
        <div className="text-center">
          <h1>Management Tasks</h1>
          <hr></hr>
        </div>
        <div className="row">
          <div className={isDisplayForm ? "col-4" : ""}>{elmTaskForm}</div>
          <div className={isDisplayForm ? "col-8" : "col-12"}>
            <button
              type="button"
              className="btn btn-primary mb-3"
              onClick={this.onToggleForm}
            >
              <span className="fa fa-plus mr-3"></span>Add Task
            </button>
            <Control
              onSearch={this.onSearch}
              onSort={this.onSort}
              sortBy={sortBy}
              sortValue={sortValue}
            />
            <TaskList
              tasks={tasks}
              onUpdateStatus={this.onUpdateStatus}
              onDelete={this.onDelete}
              onUpdate={this.onUpdate}
              onFilter={this.onFilter}
              onSelectedItem={this.onSelectedItem}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
