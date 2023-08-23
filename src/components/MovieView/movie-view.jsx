import { HeroCard } from "../HeroCard/hero-card";
import { useState } from "react";

// const [selectedHero, setSelectedHero] = useState(null);

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.ImagePath} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>This movie was created for </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <div>
                {/* <span>Heroes: </span>
                <span>{movie.Heroes.join(', ')}</span> */}
                <div>
                    Heroes:
                    {movie.Heroes.map((hero) => (
                        <HeroCard
                            key={movie._id}
                            hero={hero}
                        // onHeroClick={(newSelectedHero) => {
                        //     setSelectedHero(newSelectedHero);
                        // }}
                        />
                    ))}
                </div>
            </div>
            <div>
                <span>Villain: </span>
                <span>{movie.Villain}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};