import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { deleteMovie } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
  };

  componentDidMount() {
    const movies = getMovies();
    this.setState({ movies });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleLike = (movie) => {
    console.log("liked : " + movie.liked + " - " + movie.title);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    console.log("Index :" + index);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  render() {
    const { length: count } = this.state.movies;

    if (count === 0)
      return <h4 className="m-4">There are no movies in database</h4>;

    const paginatedMovies = paginate(
      this.state.movies,
      this.state.currentPage,
      this.state.pageSize
    );
    return (
      <React.Fragment>
        <p>Showing {count} movies from database</p>
        <table className="table m-2">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedMovies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  ></Like>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <Pagination
          itemCount={count}
          currentPage={this.state.currentPage}
          pageSize={this.state.pageSize}
          onPageChange={this.handlePageChange}
        ></Pagination>
      </React.Fragment>
    );
  }
}

export default Movies;
