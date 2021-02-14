import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          onClick={() => this.props.onLike(movie)}
        ></Like>
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.props.onDelete(movie)}
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { paginatedMovies, onSort, sortColumn } = this.props;
    return (
      <table className="table m-2">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        ></TableHeader>
        <TableBody data={paginatedMovies} columns={this.columns}></TableBody>
      </table>
    );
  }
}

export default MoviesTable;
