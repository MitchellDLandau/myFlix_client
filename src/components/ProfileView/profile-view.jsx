import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../MovieCard/movie-card";

export const ProfileView = ({ user, movies, token, updateUser }) => {

    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.birthday);
    const favoriteMovies = movies.filter((movie) => user.FavoriteMovies.includes(movie._id));
    console.log(user)

    // handleShow = () => { setShow(true) };
    // handleHide = () => { setShow(false) };

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
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("token", res.token);
                    alert("Account has been updated");
                    window.location.reload();
                } else {
                    alert("Update failed");
                }

            });
        // window.location.reload();
    }

    deleteUser = () => {
        console.log(user)
        fetch("https://marvel-movie-mapper-0064171d8b92.herokuapp.com/users/" + user._id, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                if (response.ok) {
                    return  //adjust to how the api responds? Working fine now without api response being used
                }
            })
            .then(() => {
                alert("Your account has been deleted.");
                localStorage.clear();
                window.location.reload();
            })
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
                            {/* <Card.Text>favorite:{user.FavoriteMovies.stringify}</Card.Text> */}
                            {/* <Button variant="primary" onClick={handleShow}>Update profile</Button> */}
                            <Button variant="primary" onClick={deleteUser}>Delete account</Button>
                        </Card>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col>
                        {/* {favoriteMovies.map((movies) => (
                            <Col>
                                <MovieCard movies={movies} user={user} token={token} />
                            </Col>
                        ))} */}
                    </Col>
                </Row>

                <Form onSubmit={handleSubmit}>
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
                </Form>
            </>

        )
    };
};
// };
