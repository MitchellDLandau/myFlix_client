import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100 cardBody">
            <Card.Img onClick={() => {
                onMovieClick(movie);
            }}
                variant="top" src={movie.ImagePath} />
            <Card.Body onClick={() => {
                onMovieClick(movie);
            }}>
                {movie.Title}
            </Card.Body>
        </Card>
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
    onMovieClick: PropTypes.func.isRequired
};