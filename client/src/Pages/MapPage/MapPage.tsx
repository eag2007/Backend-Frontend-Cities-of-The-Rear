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
    loadCities();
    // getCities();
    console.log(cities);
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

  const loadCities = async () => {
    setCities(mockCities);
    setLoading(false);
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

const mockCities: City[] = [
  {
    id: 1,
    name: "Москва",
    imageUrl: "https://via.placeholder.com/400x300",
    shortDesc: "Столица России, город-герой",
    longDesc:
      "В годы Великой Отечественной войны Москва стала символом мужества и стойкости советского народа. Здесь было организовано народное ополчение, работали оборонные заводы, выпускавшие вооружение для фронта.",
    contribution: "Оборона Москвы, производство вооружения, народное ополчение",
    categories: [1, Category.Weapon, Category.Technic],
    coordinates: [55.751244, 37.618423],
  },
  {
    id: 2,
    name: "Санкт-Петербург",
    imageUrl: "https://via.placeholder.com/400x300",
    shortDesc: "Город-герой Ленинград",
    longDesc:
      "Выдержал 872 дня блокады, символ несгибаемости духа. В осажденном городе продолжали работать заводы, выпускавшие танки КВ, артиллерийские орудия и боеприпасы.",
    contribution: "Оборона Ленинграда, Дорога жизни, производство танков",
    categories: [1, Category.Weapon, Category.Technic],
    coordinates: [59.93428, 30.335099],
  },
  {
    id: 3,
    name: "Челябинск",
    imageUrl: "https://via.placeholder.com/400x300",
    shortDesc: "Танкоград",
    longDesc:
      "В годы войны Челябинск называли Танкоградом. Каждый второй танк Т-34 имел двигатель, сделанный в Челябинске. Здесь был создан легендарный танк КВ и ИС.",
    contribution: "Танки, двигатели, боеприпасы",
    categories: [3, Category.Technic, Category.Weapon],
    coordinates: [55.160287, 61.402749],
  },
  {
    id: 4,
    name: "Иваново",
    imageUrl: "https://via.placeholder.com/400x300",
    shortDesc: "Город трудовой доблести",
    longDesc:
      "Иваново - центр текстильной промышленности. В годы войны город обеспечивал армию обмундированием, выпуская миллионы метров тканей для формы и снаряжения.",
    contribution: "Текстильная промышленность, обмундирование для армии",
    categories: [3, Category.Uniform],
    coordinates: [57.000286, 40.973882],
  },
  {
    id: 5,
    name: "Волгоград",
    imageUrl: "https://via.placeholder.com/400x300",
    shortDesc: "Сталинградская битва",
    longDesc:
      "Сталинградская битва стала коренным переломом в войне. Город был полностью разрушен, но не сдался врагу. Заводы продолжали выпускать танки даже во время боев.",
    contribution: "Оборона Сталинграда, производство танков",
    categories: [1, Category.Weapon, Category.Technic],
    coordinates: [48.708048, 44.513305],
  },
  {
    id: 6,
    name: "Омск",
    imageUrl: "https://via.placeholder.com/400x300",
    shortDesc: "Город трудовой доблести",
    longDesc:
      "В Омск был эвакуирован ряд оборонных заводов, в том числе завод №173, выпускавший артиллерийские орудия. Город стал крупнейшим центром военного производства в Сибири.",
    contribution: "Артиллерийские орудия, авиамоторы",
    categories: [3, Category.Weapon, Category.Technic],
    coordinates: [54.988483, 73.324236],
  },
  {
    id: 7,
    name: "Саратов",
    imageUrl: "https://via.placeholder.com/400x300",
    shortDesc: "Город трудовой доблести",
    longDesc:
      "Саратовский авиационный завод выпускал легендарные штурмовики Ил-2. Город также был важным центром пищевой промышленности, обеспечивая фронт продовольствием.",
    contribution: "Авиастроение, продовольствие",
    categories: [3, Category.Technic, Category.Food],
    coordinates: [51.533557, 46.034266],
  },
  {
    id: 8,
    name: "Нижний Тагил",
    imageUrl: "https://via.placeholder.com/400x300",
    shortDesc: "Танковый завод",
    longDesc:
      "Уральский танковый завод №183 был основным производителем танков Т-34. За годы войны завод выпустил более 25 000 танков.",
    contribution: "Танки Т-34",
    categories: [3, Category.Technic, Category.Weapon],
    coordinates: [57.919013, 59.964684],
  },
];

export default CitiesMapPage;
