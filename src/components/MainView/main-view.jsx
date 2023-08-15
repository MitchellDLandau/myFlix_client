import { useState } from "react"
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
    const [movies, setMovie] = useState([]);

    useEffect(() => {
        fetch("https://marvel-movie-mapper-0064171d8b92.herokuapp.com")
            .then((response) = response.json())
            .then((data) => {
                const movieFromApi = data.docs.map((doc) => {
                    return {
                        _id: doc._id,
                        Title: doc.Title,
                        Description: doc.Description,
                        ImagePath: doc.ImagePath,
                        Director: doc.Director,
                        Genre: doc.Genre,
                        Heroes: doc.Heroes,
                        Villain: doc.Villain
                    };
                });
                setMovie(movieFromApi);
            });
    }, []);

    const [selectedMovie, setSelectedMovie] = useState(null);
    if (selectedMovie) {
        return (<MovieView movie={selectedMovie} onBackClick={() =>
            setSelectedMovie(null)} />
        );
    }
    if (movies.length === 0) {
        return <div>This list is empty.</div>;
    }
    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
            <span>testing</span>
        </div>
    );
};