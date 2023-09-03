import { HeroCard } from "../HeroCard/hero-card";
import { useParams } from "react-router";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { movieID } = useParams();

    const mover = movies.find((m) => `:${m._id}` === movieID);

    if (!mover) {
        return <div>Movie was not found</div>;
    }

    return (
        <Card className="h-100 movieBody">
            <Card.Title className="Title">{mover.Title}</Card.Title>
            <Card.Img variant="top" src={mover.ImagePath} />
            <Card.Body>
                <Card.Text>Descriprion: {mover.Description}</Card.Text>
                <Card.Text>Directed by: {mover.Director.Name}</Card.Text>
                <Card.Text>
                    Heroes:
                    {mover.Heroes.map((hero) => (
                        <HeroCard
                            hero={hero} />
                    ))}
                </Card.Text>
                <Card.Text>Villain: {mover.Villain}</Card.Text>
                <Card.Text>{mover.Genre.Name}</Card.Text>
                <Link to={`/`}>
                    <Button className="back-button">Back</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};
