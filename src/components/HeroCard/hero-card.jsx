import { Link } from "react-router-dom";
import "./hero-card.scss"

export const HeroCard = ({ hero }) => {

    return (
        <Link to={`/?search=${encodeURIComponent(hero)}`}>
            <span className="hero-link">{` ${hero},`}</span>
        </Link>
    );
};