import "./SearchPage.css";
import "../../style.css";
import CitiesGrid from "../../Components/SearchPage/CitiesGrid/CitiesGrid";
import { City } from "../../Models/City";
import { useEffect, useState } from "react";
import { getAllCitiesApi, getCityByIdApi } from "../../Services/CityService";
import { Search } from "lucide-react";

type Props = {};

const categoriesMap: { [key: string]: number[] } = {
  all: [],
  weapon: [1],
  uniform: [2],
  technic: [3],
  food: [4],
};

const SearchPage = (props: Props) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState<City[]>([]);

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

  useEffect(() => {
    getCities();
    console.log(cities);
  }, []);

  const filteredData = cities.filter((city) => {
    if (activeCategory !== "all") {
      const catIds = categoriesMap[activeCategory];
      if (!city.categories.some((c) => catIds.includes(c))) return false;
    }

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      const hasMatchingName = city.names.some((name) =>
        name.toLowerCase().includes(lowerSearch),
      );
      if (!hasMatchingName) return false;
    }

    return true;
  });

  return (
    <div>
      <main>
        <div className="container">
          <div className="filters-panel">
            <div className="search-box">
              <input
                type="text"
                placeholder={"Поиск города..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="category-filters" id="categoryFilters">
              {["all", "weapon", "technic", "food", "uniform"].map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === "all"
                    ? "Все"
                    : cat === "weapon"
                      ? "Оружие"
                      : cat === "technic"
                        ? "Техника"
                        : cat === "food"
                          ? "Продовольствие"
                          : "Обмундирование"}
                </button>
              ))}
            </div>
          </div>

          <div id="citiesContainer" className="cities-grid">
            {cities.length != 0 ? (
              <CitiesGrid data={filteredData} />
            ) : (
              <p>Города не найдены</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
