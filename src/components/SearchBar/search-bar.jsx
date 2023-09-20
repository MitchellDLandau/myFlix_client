import { useState, useEffect } from "react";
import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";
import { MovieCard } from "../MovieCard/movie-card";
import "./search-bar.scss";

export const SearchBar = ({ movies, hero, onClose }) => {

    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        if (hero) {
            setSearchInput(hero);
        }
    }, [hero]);

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const filteredMovies = movies.filter((movie) => {
        return movie.Heroes.some((hero) =>
            hero.toLowerCase().includes(searchInput.toLowerCase())
        );
    });

    return (
        <Container>
            <Row className="search-card justify-content-center">
                <Col xs={1} sm={2} md={3} lg={4} xl={4}></Col>
                <Col>
                    <Card xs={10} sm={8} md={6} lg={4} xl={4}>
                        <Card.Body className="logo-title">
                            <>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>
                                            Search by Hero
                                        </Form.Label>
                                        <Form.Control
                                            className="hero-search-bar"
                                            type="text"
                                            onChange={handleChange}
                                            value={searchInput} />
                                    </Form.Group>
                                </Form>
                            </>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={1} sm={2} md={3} lg={4} xl={4}></Col>
                {/* <Col xs={4} sm={4} md={4} lg={4} xl={4}>blank
                    </Col> */}
            </Row>
            <Row>
                {filteredMovies.map((movie) => (
                    <Col xs={12} sm={6} md={4} lg={3} xl={3} className="mb-4" key={movie._id} >
                        <MovieCard movie={movie} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

