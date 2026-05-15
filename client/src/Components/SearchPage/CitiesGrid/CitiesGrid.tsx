import "./CitiesGrid.css";
import "../../../style.css";
import { City } from "../../../Models/City";
import CityCard from "../CityCard/CityCard";

type Props = {
  data: City[];
};

const CitiesGrid = ({ data }: Props) => {
  const onUpdated = () => {};
  return (
    <div>
      {data === null ? (
        <p>Films not found</p>
      ) : (
        data?.map((city, index) => (
          <CityCard key={index} city={city} onUpdated={onUpdated} />
        ))
      )}
    </div>
  );
};

export default CitiesGrid;
