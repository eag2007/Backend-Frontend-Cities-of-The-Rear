import "./CityCard.css";
import "../../../style.css";

import { Category } from "../../../Models/Category";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/useAuth";
import { City } from "../../../Models/City";
import { deleteCityByIdApi } from "../../../Services/CityService";
import { SquarePlus, Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";

type Props = {
  city: City;
  onUpdated: () => void;
};

const CityCard = ({ city, onUpdated }: Props) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const getCategoryName = (cat: Category) => {
    switch (cat) {
      case Category.Weapon:
        return "Оружие";
      case Category.Technic:
        return "Техника";
      case Category.Food:
        return "Продовольствие";
      case Category.Uniform:
        return "Обмундирование";
      default:
        return "Неизвестно";
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Ты уверен?")) {
      await deleteCityByIdApi(city.id).catch((e) =>
        console.log("Unexpected error"),
      );
      onUpdated();
    }
    console.log("Delete city:", city.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/city/${city.id}/edit`);
    console.log("Edit city:", city.id);
  };
  return (
    <div className="city-card" onClick={() => navigate(`/city/${city.id}`)}>
      <div
        className="city-card-image"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1)), url(${city.imageUrl});`,
        }}
      ></div>
      {isLoggedIn() && (
        <div className="city-card-action-buttons">
          <button className="city-card-edit-btn" onClick={handleEdit}>
            <Pencil size={15} /> Редактировать
          </button>
          <button className="city-card-delete-btn" onClick={handleDelete}>
            <Trash2 size={15} /> Удалить
          </button>
        </div>
      )}
      <div className="city-card-info">
        <div className="city-card-name">{city.name}</div>
        <div className="city-card-desc">
          {city.shortDesc.substring(0, 100)}
          {city.shortDesc.length > 100 ? "..." : ""}
        </div>
        <div className="city-card-contribution-badge">
          <SquarePlus size={20} /> &nbsp; {city.contribution}
        </div>
        <div className="city-card-category">
          {city.categories.map((result) => {
            return (
              <div className="city-card-category-chip">
                {getCategoryName(result)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CityCard;
