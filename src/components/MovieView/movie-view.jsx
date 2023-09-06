import { HeroCard } from "../HeroCard/hero-card";
import { useParams } from "react-router";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies, user, token }) => {
    const { movieID } = useParams();
    const mover = movies.find((m) => `:${m._id}` === movieID);

    const favorites = () => {

        fetch("https://marvel-movie-mapper-0064171d8b92.herokuapp.com/users/" + user.Username + "/movies/" + mover._id, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    alert(`${mover.Title} was added to your favorites.`);
                } else {
                    alert("Movie did not post");
                }
            });
    }

    const removeFavorite = () => {

        fetch("https://marvel-movie-mapper-0064171d8b92.herokuapp.com/users/" + user.Username + "/movies/" + mover._id, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                if (res) {
                    alert(`${mover.Title} was removed from your favorites.`);
                } else {
                    alert("Movie was not removed");
                }
            });
    }

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
                    <Button variant="primary" onClick={favorites}>Add to favorites</Button>
                    <Button variant="primary" onClick={removeFavorite}>Remove favorite</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};
