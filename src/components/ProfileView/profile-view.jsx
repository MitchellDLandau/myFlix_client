import { useState } from "react";
import { Card, Button, Row, Col, Form, Container } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { MovieCard } from "../MovieCard/movie-card";
import { NewMovie } from "../NewMovie/new-movie";
import { UpdateUser } from "./update-user";
import "./profile-view.scss";


export const ProfileView = ({ user, movies, token }) => {

    const [isActive, setActive] = useState(false);
    const [newActive, setNewActive] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const favoriteMovies = movies.filter((movie) => user.FavoriteMovies.includes(movie._id));

    const deleteUser = () => {
        fetch("https://marvel-movie-mapper-0064171d8b92.herokuapp.com/users/" + user._id, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                if (response.ok) {
                    return
                }
            })
            .then(() => {
                alert("Your account has been deleted.");
                localStorage.clear();
                window.location.reload();
            })
    }

    const confirmDelete = () => {
        setConfirm(!confirm);
    }

    const toggleClass = () => {
        setActive(!isActive);
    }

    const toggleMovieClass = () => {
        setNewActive(!newActive);
    }

    if (user) {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={12} sm={6}>
                        <Card className="profile-cards">
                            <Card.Body>
                                <Card.Title>Profile</Card.Title>
                                <Card.Text>Name: {user.Username}</Card.Text>
                                <Card.Text>E-mail: {user.Email}</Card.Text>
                                <Card.Text>Birthday: {user.Birthday}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Card className="profile-cards">
                            <Card.Body>
                                <Card.Title>Edit account</Card.Title>
                                <Button variant="primary" onClick={toggleClass}>Update profile</Button>
                                <Form.Group className={`${isActive ? '' : 'active'}`} >
                                    <UpdateUser user={user} token={token} />
                                </Form.Group >
                                {user.Fork === "spoon" &&
                                    <Button variant="primary" onClick={toggleMovieClass}>Add a movie</Button>}
                                <Form.Group className={`${newActive ? '' : 'newMovieActive'}`}>
                                    {user.Fork === "spoon" && <NewMovie user={user} token={token} />}
                                </Form.Group>
                                <Button variant="primary" onClick={deleteUser} className={`${confirm ? '' : 'confirmDelete'}`}>Confirm delete account</Button>
                                <Button variant="primary" onClick={confirmDelete} className={`${confirm ? 'confirmDelete' : ''}`}>Delete account</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Card className="favorite-card">
                    <Row>
                        <h1>Favorite Movies</h1>
                    </Row>

                    <Row>
                        {favoriteMovies.map((movie) => (
                            <Col xs={12} sm={6} md={4} lg={3} xl={3} className="mb-4 " key={movie._id} >
                                <MovieCard movie={movie} />
                            </Col>
                        ))}
                    </Row>
                </Card>
            </Container>
        )
    };
};