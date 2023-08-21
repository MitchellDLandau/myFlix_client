import PropTypes from "prop-types";

export const HeroCard = ({ movie, onHeroClick }) => {
    return (
        <div
            onClick={() => {
                onHeroClick(movie);
            }}
        >
            {movie.Heroes}
        </div>
    );
};