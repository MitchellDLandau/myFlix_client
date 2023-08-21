import { useState } from "react"
import { useEffect, useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovie] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);


    useEffect(() => {
        if (!token)
            return;

        fetch("https://marvel-movie-mapper-0064171d8b92.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((movies) => {
                setMovies(movies);
            });
    }, [token]);

    if (!user) {
        return (
            <LoginView
                onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                }}
            />
        );
    }

    useEffect(() => {
        fetch("https://marvel-movie-mapper-0064171d8b92.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
                console.log('movies from api', data)
                const moviesFromApi = data.map((movie) => {
                    return {
                        _id: movie._id,
                        Title: movie.Title,
                        Description: movie.Description,
                        ImagePath: movie.ImagePath,
                        Director: movie.Director,
                        Genre: movie.Genre,
                        Heroes: movie.Heroes,
                        Villain: movie.Villain
                    };
                });
                setMovie(moviesFromApi);
            });
    }, []);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() =>
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
            <button onClick={() => {
                setUser(null); setToken(null); localStorage.clear();
            }}>Logout</button>
        </div>
    );
    // <button onClick={() => {setUser(null); setToken(null);
    // }}>Logout</button>
};