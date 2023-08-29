import { HeroCard } from "../HeroCard/hero-card";
import { Button, Card } from "react-bootstrap";
import "./movie-view.scss";

// const [selectedHero, setSelectedHero] = useState(null);

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
                            key={movie._id}
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

// Done before bootstrap keeping for reference. 
//         <div>
//             <div>
//                 <img src={movie.ImagePath} />
//             </div>
//             <div>
//                 <span>Title: </span>
//                 <span>{movie.Title}</span>
//             </div>
//             <div>
//                 <span>Description: </span>
//                 <span>{movie.Description}</span>
//             </div>
//             <div>
//                 <span>This movie was created for </span>
//                 <span>{movie.Genre.Name}</span>
//             </div>
//             <div>
//                 <span>Director: </span>
//                 <span>{movie.Director.Name}</span>
//             </div>
//             <div>
//                 {/* <span>Heroes: </span>
//                 <span>{movie.Heroes.join(', ')}</span> */}
                // <div>
                //     Heroes:
                //     {movie.Heroes.map((hero) => (
                //         <HeroCard
                //             key={movie._id}
                //             hero={hero}
                //         // onHeroClick={(newSelectedHero) => {
                //         //     setSelectedHero(newSelectedHero);
                //         // }}
                //         />
                //     ))}
                // </div>
//             </div>
//             <div>
//                 <span>Villain: </span>
//                 <span>{movie.Villain}</span>
//             </div>
//             <Button className="mb-4" onClick={onBackClick}>Back</Button>
//         </div>
//     );
// };