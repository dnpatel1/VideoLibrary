import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import GenreList from "./GenreList";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genreList: [],
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const movies = getMovies();
    let genreList = getGenres();
    genreList = [{ _id: "", name: "All Genres" }, ...genreList];
    this.setState({ movies, genreList });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = (genre) => {
    console.log(JSON.stringify(genre));
    this.setState({ activeGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
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
    const { activeGenre, movies, sortColumn } = this.state;
    console.log("movies :" + movies.length);
    console.log("activeGenre:");
    console.log(activeGenre);

    if (count === 0)
      return <h4 className="m-4">There are no movies in database</h4>;

    //if filter is present then filter before pagination...
    const filteredMovies =
      activeGenre && activeGenre._id
        ? movies.filter((x) => x.genre._id === activeGenre._id)
        : movies;

    //sort the data if applicable
    const sortedFilteredMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    console.log("filteredMovies :" + sortedFilteredMovies);
    //apply pagination after filtering data
    const paginatedMovies = paginate(
      sortedFilteredMovies,
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
          <MoviesTable
            paginatedMovies={paginatedMovies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          ></MoviesTable>
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
