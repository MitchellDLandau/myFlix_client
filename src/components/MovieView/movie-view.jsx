export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.ImagePath} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <div>
                <span>Heroes: </span>
                <span>{movie.Heroes.join(', ')}</span>
            </div>
            <div>
                <span>Villain: </span>
                <span>{movie.Villain}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};