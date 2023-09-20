import { useState } from "react";
import { SearchBar } from "../SearchBar/search-bar";
import "./hero-card.scss"

export const HeroCard = ({ hero, movies }) => {
    const [isSearchBarVisible, setSearchBarVisible] = useState(false);

    return (
        <>

            <span className="hero-link"
                onClick={() => {
                    setSearchBarVisible(true);
                }}
            >
                {`${hero}, `}
            </span>
            {isSearchBarVisible && (
                <SearchBar hero={hero} movies={movies} onClose={() => setSearchBarVisible(false)} />
            )}

        </>
    );
};