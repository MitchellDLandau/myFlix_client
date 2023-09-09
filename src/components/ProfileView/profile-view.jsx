import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../MovieCard/movie-card";
import { NewMovie } from "../NewMovie/new-movie";
import "./profile-view.scss";

export const ProfileView = ({ user, movies, token }) => {

    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const [isActive, setActive] = useState(false);
    const favoriteMovies = movies.filter((movie) => user.FavoriteMovies.includes(movie._id));

    const updateUser = () => {

        fetch("https://marvel-movie-mapper-0064171d8b92.herokuapp.com/users/" + user._id, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                const dataString = JSON.stringify(data);
                localStorage.setItem("user", dataString);
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error while fetching data:", error);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://marvel-movie-mapper-0064171d8b92.herokuapp.com/users/" + user._id, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    updateUser();
                    alert("Account has been updated.");
                } else {
                    alert("Update failed.");
                }

            });
    }

    deleteUser = () => {
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

    const toggleClass = () => {
        setActive(!isActive);
        console.log(isActive)
    }

    if (user) {
        return (
            <>
                <Row className="justify-content-md-center">
                    <Col>
                        <Card>
                            <Card.Title>Profile</Card.Title>
                            <Card.Text>Username: {user.Username}</Card.Text>
                            <Card.Text>Eamil: {user.Email}</Card.Text>
                            <Card.Text>Birthday: {user.Birthday}</Card.Text>
                        </Card>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col>
                        {favoriteMovies.map((movie) => (
                            <Col key={movie.Title}>
                                <MovieCard movie={movie} />
                            </Col>
                        ))}
                        <Button variant="primary" onClick={toggleClass}>Update profile</Button>
                        <Button variant="primary" onClick={deleteUser} >Delete account</Button>
                    </Col>
                </Row>

                <Form className={`${isActive ? '' : 'active'}`} onSubmit={handleSubmit}>
                    <Form.Group controlId="editFormUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength="6"
                        />
                    </Form.Group>

                    <Form.Group controlId="editFormPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6"
                        />
                    </Form.Group>

                    <Form.Group controlId="editFormEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="editFormBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form >
                <Form.Group>
                    {user.Fork === "spoon" && <NewMovie user={user} token={token} />}
                </Form.Group>
            </>

        )
    }
    console.log(user)
    if (user) {
        return (
            <>
                <Button>Special Button</Button>
                <NewMovie user={user} token={token} />
                <Button>testing</Button>
            </>
        )
    }
    return null;

};

