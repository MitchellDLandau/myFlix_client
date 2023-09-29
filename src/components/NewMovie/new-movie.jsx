import { Button, Form } from "react-bootstrap";
import { useState } from "react";

export const NewMovie = ({ user, token }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imagePath, setImagePath] = useState("");
    const [director, setDirector] = useState("");
    const [genre, setGenre] = useState("");
    const [heroes, setHeroes] = useState("");
    const [villain, setVillain] = useState("");

    const handleMovie = (event) => {
        event.preventDefault();

        const data = {
            Title: title,
            Description: description,
            ImagePath: imagePath,
            Director: director,
            Genre: genre,
            Heroes: heroes,
            Villain: villain
        };
        console.log(data);
        console.log(imagePath);

        fetch("https://marvel-movie-mapper-0064171d8b92.herokuapp.com/movies", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data) {
                    alert(`${data.Title} has been added to the database.`)
                } else {
                    alert("Could not add.");
                }
            })
            .catch((e) => {
                alert("Something went wrong");
                console.log(e);
            })
    };


    if (user) {
        return (
            <>
                <Form onSubmit={handleMovie}>
                    <Form.Group controlId="addMovieTitle">
                        <Form.Label>Title: </Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="addMovieDescription">
                        <Form.Label>Description: </Form.Label>
                        <Form.Control
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="addMovieImagePath">
                        <Form.Label>Image Path: </Form.Label>
                        <Form.Control
                            type="text"
                            value={imagePath}
                            onChange={(e) => setImagePath(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="addMovieDirector">
                        <Form.Label>Director: </Form.Label>
                        <Form.Control
                            type="text"
                            value={director}
                            onChange={(e) => setDirector(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="addMovieGenre">
                        <Form.Label>Genre: </Form.Label>
                        <Form.Control
                            type="text"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="addMovieHeroes">
                        <Form.Label>Heroes: </Form.Label>
                        <Form.Control
                            type="text"
                            value={heroes}
                            onChange={(e) => setHeroes(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="addMovieVillain">
                        <Form.Label>Villain: </Form.Label>
                        <Form.Control
                            type="text"
                            value={villain}
                            onChange={(e) => setVillain(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit Movie</Button>
                </Form>
            </>
        )
    }
}