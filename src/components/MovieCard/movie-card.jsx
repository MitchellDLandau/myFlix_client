import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import "./movie-card.scss";

export const MovieCard = ({ movie }) => {

    const movieURL = `/movies/:${encodeURIComponent(movie._id)}`

    const handleMovieCardClick = () => {
        window.location.href = movieURL;
    };

    return (
        <>
            <Card
                className="h-100 movie-card-body"
                onClick={handleMovieCardClick}
            >
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title className="movie-title">{movie.Title}</Card.Title>
                </Card.Body>
            </Card>
        </>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Director: PropTypes.object,
        DirectorDescription: PropTypes.string,
        Genre: PropTypes.object,
        Heroes: PropTypes.array,
        Villain: PropTypes.string,
    }).isRequired,
};