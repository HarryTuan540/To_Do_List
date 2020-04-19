import React, { Component } from "react";

class Sort extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
  onClick = (sortBy, sortValue) => {
    console.log(sortBy, "-", sortValue);
    this.props.onSort(sortBy, sortValue);
  };

  render() {
    return (
      <div className="col-6 pl-5">
        <div className="dropdown ml-5">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            Sort
            <span className="fa fa-caret-square-o-down ml-2"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li onClick={() => this.onClick("name", 1)}>
              <a
                role="button"
                className={
                  this.props.sortBy === "name" && this.props.sortValue === 1
                    ? "sort_selected"
                    : ""
                }
              >
                <span className="fa fa-sort-alpha-asc pr-5">Name A-Z</span>
              </a>
            </li>
            <li onClick={() => this.onClick("name", -1)}>
              <a
                role="button"
                className={
                  this.props.sortBy === "name" && this.props.sortValue === -1
                    ? "sort_selected"
                    : ""
                }
              >
                <span className="fa fa-sort-alpha-asc pr-5">Name Z-A</span>
              </a>
            </li>
            <li role="seperator" className="divider"></li>
            <li onClick={() => this.onClick("status", 1)}>
              <a
                role="button"
                className={
                  this.props.sortBy === "status" && this.props.sortValue === 1
                    ? "sort_selected"
                    : ""
                }
              >
                Active Status
              </a>
            </li>
            <li onClick={() => this.onClick("status", -1)}>
              <a
                role="button"
                className={
                  this.props.sortBy === "status" && this.props.sortValue === -1
                    ? "sort_selected"
                    : ""
                }
              >
                Hide Status
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sort;
