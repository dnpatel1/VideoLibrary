import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import GenreList from "./GenreList";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genreList: [],
    activeGenre: {},
  };

  componentDidMount() {
    const movies = getMovies();
    this.setState({ movies });
    const genres = getGenres();
    this.setState({ genreList: genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = (genre) => {
    console.log(genre);
    this.setState({ activeGenre: genre });
  };

  handleLike = (movie) => {
    console.log("liked : " + movie.liked + " - " + movie.title);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    // console.log("Index :" + index);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  render() {
    const { length: count } = this.state.movies;
    const { activeGenre, movies: allMovies } = this.state;
    console.log("allmovies :" + allMovies.length);
    console.log("activeGenre: " + activeGenre);

    if (count === 0)
      return <h4 className="m-4">There are no movies in database</h4>;

    //if filter is present then filter before pagination...
    const filteredMovies =
      activeGenre === null
        ? allMovies.filter((x) => x.genre._id === activeGenre._id)
        : allMovies;

    console.log("filteredMovies :" + filteredMovies);
    //apply pagination after filtering data
    const paginatedMovies = paginate(
      filteredMovies,
      this.state.currentPage,
      this.state.pageSize
    );
    return (
      <div className="row">
        <div className="col-2">
          <GenreList
            genres={this.state.genreList}
            activeGenre={activeGenre}
            onGenreChange={this.handleGenreChange}
          ></GenreList>
        </div>
        <div className="col">
          <p>Showing {filteredMovies.length} movies from database</p>
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
            itemCount={filteredMovies.length}
            currentPage={this.state.currentPage}
            pageSize={this.state.pageSize}
            onPageChange={this.handlePageChange}
          ></Pagination>
        </div>
      </div>
    );
  }
}

export default Movies;
