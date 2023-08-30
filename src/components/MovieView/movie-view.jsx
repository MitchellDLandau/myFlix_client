import { HeroCard } from "../HeroCard/hero-card";
import { Button, Card } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <Card className="h-100 movieBody">
            <Card.Title className="Title">{movie.Title}</Card.Title>
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
                <Card.Text>Descriprion: {movie.Description}</Card.Text>
                <Card.Text>Directed by: {movie.Director.Name}</Card.Text>
                <Card.Text>
                    Heroes:
                    {movie.Heroes.map((hero) => (
                        <HeroCard
                            hero={hero} />
                    ))}
                </Card.Text>
                <Card.Text>Villain: {movie.Villain}</Card.Text>
                <Card.Text>{movie.Genre.Name}</Card.Text>
                <Button className="mb-4" onClick={onBackClick}>Back</Button>
            </Card.Body>
        </Card>
    );
};