import { useState, useEffect } from "react";
import "./MapPage.css";
import { City } from "../../Models/City";
import { Category } from "../../Models/Category";
import CitiesMap from "../../Components/CitiesMap/CitiesMap";
import { getAllCitiesApi } from "../../Services/CityService";

const productionCategoryConfig: Record<
  Category,
  { name: string; icon: string; color: string }
> = {
  [Category.Weapon]: { name: "Оружие", icon: "🔫", color: "#dc2626" },
  [Category.Uniform]: { name: "Обмундирование", icon: "👕", color: "#8b5cf6" },
  [Category.Technic]: { name: "Техника", icon: "⚙️", color: "#f59e0b" },
  [Category.Food]: { name: "Продовольствие", icon: "🍞", color: "#10b981" },
};

const getCategoryNames = (categories: number[]) => {
  const names: string[] = [];
  categories.forEach((cat) => {
    if (productionCategoryConfig[cat as Category]) {
      names.push(productionCategoryConfig[cat as Category].name);
    }
  });
  return names;
};

const getCategoryIcon = (categoryId: number): string => {
  if (productionCategoryConfig[categoryId as Category]) {
    return productionCategoryConfig[categoryId as Category].icon;
  }
  return "📍";
};

const CitiesMapPage = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [filterCategory, setFilterCategory] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<"all" | "production">("all");

  useEffect(() => {
    getCities();
    setLoading(false);
  }, []);

  const getCities = async () => {
    await getAllCitiesApi()
      .then((res) => {
        if (res?.data) {
          setCities(res.data);
        }
      })
      .catch((e) => {
        console.log("No city found");
      });
  };

  const filteredCities = (() => {
    if (!filterCategory) return cities;
    return cities.filter((city) => city.categories.includes(filterCategory));
  })();

  if (loading) {
    return (
      <div className="cities-map-page">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Загрузка карты городов...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cities-map-page">
      <div className="container">
        <h1 className="page-title">
          Города трудового подвига в годы Великой Отечественной войны
        </h1>
        <p className="page-description">
          На карте отмечены города, внесшие особый вклад в Победу. Нажмите на
          маркер, чтобы увидеть подробную информацию о городе.
        </p>

        <div className="filters-section">
          <div className="filter-group">
            <h4>Производственные категории</h4>
            <div className="filters">
              <button
                className={`filter-btn weapon ${filterCategory === Category.Weapon ? "active" : ""}`}
                onClick={() => {
                  setFilterCategory(Category.Weapon);
                  setFilterType("production");
                }}
              >
                Оружие
              </button>
              <button
                className={`filter-btn technic ${filterCategory === Category.Technic ? "active" : ""}`}
                onClick={() => {
                  setFilterCategory(Category.Technic);
                  setFilterType("production");
                }}
              >
                Техника
              </button>
              <button
                className={`filter-btn uniform ${filterCategory === Category.Uniform ? "active" : ""}`}
                onClick={() => {
                  setFilterCategory(Category.Uniform);
                  setFilterType("production");
                }}
              >
                Обмундирование
              </button>
              <button
                className={`filter-btn food ${filterCategory === Category.Food ? "active" : ""}`}
                onClick={() => {
                  setFilterCategory(Category.Food);
                  setFilterType("production");
                }}
              >
                Продовольствие
              </button>
            </div>
          </div>

          {filterCategory && (
            <button
              className="clear-filter"
              onClick={() => {
                setFilterCategory(null);
                setFilterType("all");
              }}
            >
              ✕ Сбросить фильтр
            </button>
          )}
        </div>

        <div className="map-wrapper">
          <CitiesMap
            cities={filteredCities}
            center={[55.751244, 37.618423]}
            zoom={5}
          />
        </div>
      </div>
    </div>
  );
};

export default CitiesMapPage;
