import PropTypes from "prop-types";

export const HeroCard = ({ hero, onHeroClick }) => {
    return (
        <div
            onClick={() => {
                console.log(hero); //use the search component to to insert a clicked on hero and return their list of movies. 
            }}
        >
            {hero}
        </div>
    );
};