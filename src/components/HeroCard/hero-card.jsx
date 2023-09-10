export const HeroCard = ({ hero }) => { //previously thought about haveing ({ hero, onHeroClick}) may be used in future. 
    return (
        <span
            onClick={() => {
                console.log(hero); //use the search component to to insert a clicked on hero and return their list of movies. 
            }}
        >
            {hero}
        </span>
    );
};