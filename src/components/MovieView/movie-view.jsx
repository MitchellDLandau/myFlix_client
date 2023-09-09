import { HeroCard } from "../HeroCard/hero-card";
import { useParams } from "react-router";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies, user, token }) => {
    const { movieID } = useParams();
    const mover = movies.find((m) => `:${m._id}` === movieID);

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

    const favorites = () => {

        fetch("https://marvel-movie-mapper-0064171d8b92.herokuapp.com/users/" + user.Username + "/movies/" + mover._id, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    alert(`${mover.Title} was added to your favorites.`);
                    updateUser();
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
                    updateUser();
                } else {
                    alert("Movie was not removed");
                }
            });
    }

    if (!mover) {
        return <div>Movie was not found</div>;
    }

    return (
        <Card className="h-100 movieBody" key={mover._id}>
            <Card.Title className="Title">{mover.Title}</Card.Title>
            <Card.Img variant="top" src={mover.ImagePath} />
            <Card.Body>
                <Card.Text>Descriprion: {mover.Description}</Card.Text>
                <Card.Text>Directed by: {mover.Director.Name}</Card.Text>
                <Card.Text >
                    Heroes:
                    {mover.Heroes.map((hero) => (
                        <HeroCard
                            hero={hero} key={hero} />
                    ))}
                </Card.Text>
                <Card.Text>Villain: {mover.Villain}</Card.Text>
                <Card.Text>{mover.Genre.Name}</Card.Text>
                <Link to={`/`}>
                    <Button className="back-button">Back</Button>
                    <Button variant="primary" onClick={favorites}>Add to favorites</Button>
                    <Button variant="primary" onClick={removeFavorite}>Remove from favorites</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};
