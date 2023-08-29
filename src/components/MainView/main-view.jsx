import { useEffect, useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { SignupView } from "../SignupView/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./main-view.scss";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) return;

        fetch("https://marvel-movie-mapper-0064171d8b92.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('movies from api:', data)
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
                setMovies(moviesFromApi);
            });
    }, [token]);

    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <>
                    <Col md={4}>
                        <Card.Img className="LeftImg" src="https://www.pngmart.com/files/23/Marvel-Studios-Logo-PNG-Transparent.png" />
                    </Col>
                    <Col md={4}>
                        <Card.Title className="login">Login</Card.Title>
                        <LoginView
                            onLoggedIn={(user, token) => {
                                setUser(user);
                                setToken(token);
                            }}
                        />
                        <hr />
                        <Card.Title>Signup for an account bellow.</Card.Title>
                        <SignupView />
                    </Col>
                    <Col md={4}>
                        <Card.Img className="RightImg" src="https://www.pngmart.com/files/23/Marvel-Studios-Logo-PNG-Transparent.png" />
                    </Col>
                </>
            ) : selectedMovie ? (
                <Col md={8}>
                    <MovieView movie={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)} />
                </Col>
            ) : movies.length === 0 ? (
                <div>This list is empty.</div>
            ) : (
                <>
                    <h1 className="titlescreen">Marvel Movie Mapper</h1>
                    {movies.map((movie) => (
                        <Col className="mb-4" key={movie.id} md={3}>
                            <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ))}
                    <Button className="mb-4 logout" onClick={() => {
                        setUser(null); setToken(null); localStorage.clear();
                    }}>Logout</Button>
                </>
            )}
        </Row>
    );
};

// bellow is before react-bootstrap for reference. 

//     if (!user) {
//         return (
//             <>
//                 Login to your account.
//                 <LoginView
//                     onLoggedIn={(user, token) => {
//                         setUser(user);
//                         setToken(token);
//                     }} />
//                 Signup for an account bellow.
//                 <SignupView />
//             </>
//         );
//     }

//     if (selectedMovie) {
//         return (
//             <MovieView movie={selectedMovie} onBackClick={() =>
//                 setSelectedMovie(null)} />
//         );
//     }
//     if (movies.length === 0) {
//         return <div>This list is empty.</div>;
//     }
//     return (
//         <div>
//             {movies.map((movie) => (
//                 <MovieCard
//                     key={movie._id}
//                     movie={movie}
//                     onMovieClick={(newSelectedMovie) => {
//                         setSelectedMovie(newSelectedMovie);
//                     }}
//                 />
//             ))}
//             <button onClick={() => {
//                 setUser(null); setToken(null); localStorage.clear();
//             }}>Logout</button>
//         </div>
//     );
// };