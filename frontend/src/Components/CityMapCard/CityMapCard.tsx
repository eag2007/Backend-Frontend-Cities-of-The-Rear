import { Link } from "react-router-dom";
import "./CityMapCard.css";
import { City } from "../../Models/City";

interface CityCardProps {
  city: City;
}

const CityMapCard = ({ city }: CityCardProps) => {
  return (
    <Link to={`/city/${city.id}`} className="city-card-map-link">
      <div className="city-card-map">
        <div className="city-card-map-content">
          <h3 className="city-card-map-title">{city.name}</h3>
          <p className="city-card-map-description">
            {city.shortDesc.substring(0, 100)}...
          </p>
          <span className="city-card-map-link-text">Подробнее →</span>
        </div>
      </div>
    </Link>
  );
};

export default CityMapCard;
