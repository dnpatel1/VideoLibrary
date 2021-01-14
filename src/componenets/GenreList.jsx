import React from "react";

const GenreList = (props) => {
  const { genres, activeGenre, onGenreChange } = props;
  return (
    <React.Fragment>
      <ul className="list-group">
        {genres.map((genre) => (
          <li
            onClick={() => onGenreChange(genre)}
            key={genre._id}
            className={
              genre === activeGenre
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {genre.name}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default GenreList;
