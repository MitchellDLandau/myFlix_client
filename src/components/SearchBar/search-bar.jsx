import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Form, Row, Col, Card } from "react-bootstrap";
import { MovieCard } from "../MovieCard/movie-card";
import "./search-bar.scss";

export const SearchBar = ({ movies }) => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialHero = queryParams.get("search");
    const [searchInput, setSearchInput] = useState(initialHero || "");

    useEffect(() => {
        if (initialHero) {
            setSearchInput(initialHero);
        }
    }, [initialHero]);

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    const filteredMovies = movies.filter((movie) => {
        const multiSearchInput = searchInput.toLowerCase();
        return (
            movie.Heroes.some((hero) =>
                hero.toLowerCase().includes(multiSearchInput) ||
                movie.Title.toLowerCase().includes(multiSearchInput)
            )
        );
    });

    return (
        <Container>
            <Row className="search-card justify-content-center">
                <Col xs={1} sm={2} md={3} lg={4} xl={4}></Col>
                <Col>
                    <Card className="search-bar">
                        <Card.Body className="logo-title rounded">
                            <>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>
                                            Search by Hero or Title
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

